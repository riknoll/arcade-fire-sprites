game.stats = true;

const s = fireEffect.createFireSpawner(120, 32, 60, 5, false);


const sprite = s.createSprite(SpriteKind.Player);

sprite.sy = 3
sprite.rotationDegrees = 90;

game.onUpdate(() => {
    sprite.rotationDegrees += 2;
    sprite.sy = 1 + Math.max(3 * Math.sin(game.runtime() / 300), 0);
    sprite.sx = 1 - Math.min(3 * Math.sin(game.runtime() / 300), 0);
})