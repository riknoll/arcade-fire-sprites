# create fire sprite

Creates a fire sprite from the given fire spawner with the specified sprite kind.

```sig
let mySpawner = fireEffect.createFireSpawner(8, 16, 30)
let myFireSprite = fireEffect.createFireSprite(mySpawner, SpriteKind.Player)
```

## Parameters

* **spawner**: The fire spawner to spawn the fire sprite from.
* **kind**: The SpriteKind of the spawned fire sprite.

```package
arcade-fire-sprites=github:riknoll/arcade-fire-sprites
```
