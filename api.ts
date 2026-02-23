//% color=#802626
//% block="Fire Sprites"
namespace fireEffect {
    //% blockId=fireEffect_createFireSpawner
    //% block="create fire spawner with width $width height $height strength $strength||max sources $maxSources rounded bottom $roundedBottom"
    //% blockSetVariable=mySpawner
    //% width.defl=8
    //% height.defl=16
    //% strength.defl=30
    //% maxSources.defl=8
    //% inlineInputMode=inline
    //% weight=100
    export function createFireSpawner(
        width: number,
        height: number,
        strength: number,
        maxSources = 4,
        roundedBottom = false
    ): FireSpawner {
        width = Math.max(width, 1) | 0;
        height = Math.max(height, 1) | 0;
        strength = Math.max(strength, 0) | 0;
        maxSources |= 0;
        return new FireSpawner(
            width,
            height,
            strength,
            maxSources,
            roundedBottom
        );
    }

    //% blockId=fireEffect_createFireSprite
    //% block="$spawner spawn sprite with kind $kind"
    //% blockSetVariable=myFireSprite
    //% spawner.shadow=variables_get
    //% spawner.defl=mySpawner
    //% kind.shadow=spritekind
    //% inlineInputMode=inline
    //% weight=90
    export function createFireSprite(
        spawner: FireSpawner,
        kind: number
    ): Sprite {
        return spawner.createSprite(kind);;
    }

    //% blockId=fireEffect_setSpawnerStrength
    //% block="$spawner set strength to $strength"
    //% spawner.shadow=variables_get
    //% spawner.defl=mySpawner
    //% strength.defl=30
    //% inlineInputMode=inline
    //% weight=80
    //% blockGap=8
    export function setStrength(
        spawner: FireSpawner,
        strength: number
    ) {
        spawner.setStrength(strength);
    }

    //% blockId=fireEffect_setUpdateInterval
    //% block="$spawner set update interval to $interval"
    //% spawner.shadow=variables_get
    //% spawner.defl=mySpawner
    //% interval.defl=1
    //% interval.min=1
    //% inlineInputMode=inline
    //% weight=70
    //% blockGap=8
    export function setUpdateInterval(spawner: FireSpawner, interval: number) {
        spawner.updateInterval = Math.max(interval, 1) | 0;
    }

    //% blockId=fireEffect_setSputterInterval
    //% block="$spawner set sputter interval $interval"
    //% spawner.shadow=variables_get
    //% spawner.defl=mySpawner
    //% interval.defl=30
    //% interval.min=3
    //% inlineInputMode=inline
    //% weight=60
    //% blockGap=8
    export function setSputterInterval(spawner: FireSpawner, interval: number) {
        spawner.sputterInterval = Math.max(interval, 3) | 0;
    }

    //% blockId=fireEffect_setColorRamp
    //% block="$spawner set color ramp $ramp"
    //% spawner.shadow=variables_get
    //% spawner.defl=mySpawner
    //% ramp.shadow=fireEffect__image
    //% ramp.defl="img`. 2 4 5 1 1`"
    //% weight=0
    export function setColorRamp(
        spawner: FireSpawner,
        ramp: Image
    ) {
        spawner.setRamp(ramp);
    }

    //% blockId=fireEffect__image block="%img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% img.fieldOptions.decompileArgumentAsString="true"
    //% img.fieldOptions.filter="!tile !dialog !background"
    //% img.fieldOptions.disableResize=1
    //% img.fieldOptions.initWidth=6
    //% img.fieldOptions.initHeight=1
    //% duplicateShadowOnDrag
    //% blockHidden=1
    export function _image(img: Image) {
        return img
    }
}