# set strength

Sets the strength of all fire sprites spawned from the given spawner. Higher strength values will result in a taller, brighter flame.

All sprites from the spawner share the same strength, so changing the strength will change all existing sprites from that spawner.

```sig
let mySpawner = fireEffect.createFireSpawner(8, 16, 30)
fireEffect.setStrength(mySpawner, 30)
```

## Parameters

* **spawner**: The spawner to set the strength of.
* **strength**: The strength of the fire. Higher numbers will result in a brighter, taller fire.

```package
arcade-fire-sprites=github:riknoll/arcade-fire-sprites
```
