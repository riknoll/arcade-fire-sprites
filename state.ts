namespace fireEffect {
    class State {
        fires: FireData[];

        constructor() {
            this.fires = [];

            game.eventContext().registerFrameHandler(scene.UPDATE_PRIORITY - 1, () => {
                for (const fire of this.fires) {
                    fire.needsUpdate = true;
                }
            });
        }
    }

    function _stateFactory() {
        return new State();
    }

    export function _state() {
        return __util.getState(_stateFactory);
    }

    export class FireSpawner {
        protected sources: FireData[];

        public updateInterval = 1;
        public sputterInterval = 30;
        public readonly dataWidth: number;
        public readonly dataHeight: number;
        public palette: number[];

        constructor(
            public readonly width: number,
            public readonly height: number,
            public strength: number,
            public maxSources: number,
            public roundedBottom: boolean,
        ) {
            this.sources = [];
            this.dataWidth = Math.min(40, width);
            this.dataHeight = Math.min(40, height + 1);
            this.setRamp(img`
                . 2 4 5 1 1
            `);
        }

        createSprite(kind: number) {
            let data: FireData;
            if (this.sources.length < this.maxSources) {
                data = new FireData(this)
                this.sources.push(
                    data
                );
            }
            else {
                data = this.sources[0]
                let minChildren = data.children.length;

                for (let i = 1; i < this.sources.length; i++) {
                    if (this.sources[i].children.length < minChildren) {
                        data = this.sources[i];
                        minChildren = this.sources[i].children.length
                    }
                }
            }

            return data.createSprite(kind);
        }

        setStrength(strength: number) {
            this.strength = strength;
        }

        setRamp(fireRamp: Image) {
            this.palette = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5].map(index => fireRamp.getPixel(index, 0))
        }
    }

    class FireData {
        values: number[];
        rendered: Image;
        needsUpdate: boolean;
        sputterInterval: number;
        sputterCount = 0;
        children: FireView[];
        updateCount: number;

        constructor(
            public source: FireSpawner,
        ) {
            this.values = [];
            this.children = [];
            this.rendered = image.create(source.dataWidth, source.dataHeight - 1);
            this.resetSputterInterval();
            for (let x = 0; x < source.dataWidth; x++) {
                for (let y = 0; y < source.dataHeight; y++) {
                    this.values.push(0)
                }
            }
            _state().fires.push(this);
            this.updateCount = 0;
        }

        getPixel(x: number, y: number) {
            if (x < 0 || x >= this.source.dataWidth || y < 0 || y >= this.source.dataHeight) return 0;

            return this.values[y * this.source.dataWidth + x]
        }

        setPixel(x: number, y: number, value: number) {
            this.values[y * this.source.dataWidth + x] = value;
            const palette = this.source.palette;
            this.rendered.setPixel(x, y, palette[Math.min(value | 0, palette.length - 1)]);
        }

        update() {
            if (!this.needsUpdate) {
                return;
            }
            this.updateCount = (this.updateCount + 1) % this.source.updateInterval;
            if (this.updateCount !== 0) {
                return;
            }
            this.sputterCount++;

            let strength = this.source.strength;
            if (this.sputterCount % this.sputterInterval === 0) {
                strength = Math.idiv(this.source.strength, 3);
            }
            else if (this.sputterCount % this.sputterInterval === 1) {
                strength = Math.idiv(this.source.strength, 2);
            }
            else if (this.sputterCount % this.sputterInterval === 2) {
                this.resetSputterInterval();
                this.sputterCount = 2;
            }

            this.needsUpdate = false;

            for (let x = 0; x < this.source.dataWidth; x++) {
                this.setPixel(x, this.source.dataHeight - 1, randint(0, strength));
            }
            for (let x = 0; x < this.source.dataWidth; x++) {
                for (let y = 0; y < this.source.dataHeight; y++) {
                    this.setPixel(x, y - 1, (
                        this.getPixel(x, y) +
                        this.getPixel(x - 1, y) +
                        this.getPixel(x + 1, y) +
                        this.getPixel(x, y - 1) +
                        this.getPixel(x, y + 1)
                    ) / 5);
                    this.setPixel(x, y, this.getPixel(x, y) - randint(0, 8))
                }
            }

            if (this.source.roundedBottom) {
                this.rendered.setPixel(0, this.rendered.height - 1, 0);
                this.rendered.setPixel(this.rendered.width - 1, this.rendered.height - 1, 0);
            }
        }

        createSprite(kind: number): Sprite {
            const s = new FireView(this, kind)
            s.x = screen.width >> 1;
            s.y = screen.height >> 1;
            this.children.push(s);

            return s;
        }

        protected resetSputterInterval() {
            this.sputterInterval = Math.max(3, randint(this.source.sputterInterval * 2 / 3, this.source.sputterInterval * 4 / 3)) | 0;
        }
    }

    class FireView extends sprites.ExtendableSprite {
        constructor(
            public fireData: FireData,
            kind?: number
        ) {
            super(img`0`, kind);
            this.setFlag(SpriteFlag.Ghost, true);
            this.setDimensions(this.fireData.source.width, this.fireData.source.height);
        }

        draw(left: number, top: number) {
            if (this.isOutOfScreen(game.currentScene().camera)) {
                return;
            }
            this.fireData.update();
            drawFire(left, top, this.width, this.height, this.fireData);
        }

        _destroyCore() {
            super._destroyCore();
            this.fireData.children.removeElement(this);
        }
    }

    function drawFire(left: number, top: number, width: number, height: number, data: FireData) {
        // since the fire data is smaller than the width, we're going to loop
        // the middle portion
        const loopStart = 5;
        const loopLength = data.source.dataWidth - (loopStart << 1);

        if (data.source.dataWidth >= width && data.source.dataHeight >= height) {
            screen.drawTransparentImage(data.rendered, left, top);
            return;
        }


        // left edge of fire
        screen.blit(
            left,
            top,
            loopStart,
            data.source.dataHeight,
            data.rendered,
            0,
            0,
            loopStart,
            data.source.dataHeight,
            true,
            false
        );

        // right edge of fire
        screen.blit(
            left + width - loopStart,
            top,
            loopStart,
            data.source.dataHeight,
            data.rendered,
            data.source.dataWidth - loopStart,
            0,
            loopStart,
            data.source.dataHeight,
            true,
            false
        );


        // repeat the loop, flipping direction each time so that it looks more continuous
        const numLoops = (width - (loopStart << 1)) / loopLength;
        for (let i = 0; i < numLoops; i++) {
            const actualLoopLength = Math.min(loopLength, width - (loopStart << 1) - (i * loopLength))
            const offsetX = left + loopStart + i * loopLength;
            if (i & 1) {
                // we don't have an API to blit backwards, so do it column by column
                for (let x = 0; x < actualLoopLength; x++) {
                    screen.blit(
                        offsetX + x,
                        top,
                        1,
                        data.source.dataHeight,
                        data.rendered,
                        data.source.dataWidth - loopStart - x,
                        0,
                        1,
                        data.source.dataHeight,
                        true,
                        false
                    );
                }
            }
            else {
                screen.blit(
                    offsetX,
                    top,
                    actualLoopLength,
                    data.source.dataHeight,
                    data.rendered,
                    loopStart,
                    0,
                    actualLoopLength,
                    data.source.dataHeight,
                    true,
                    false
                );
            }
        }
    }
}