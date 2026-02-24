# set update interval

Sets the update interval of the given fire spawner. The update interval controls how often the fire simulation updates, in frames. A value of 1 wil update the fire every frame, a value of 2 will update every other frame, etc. Higher values will slow down the fire animation. the animation speed of all existing sprites from that spawner.

```sig
let mySpawner = fireEffect.createFireSpawner(8, 16, 30)
fireEffect.setUpdateInterval(mySpawner, 1)
```

## Parameters

* **spawner**: The spawner to set the update interval of.
* **interval**: The number of frames between fire updates. Higher values will slow down the fire animation.

```package
arcade-fire-sprites=github:riknoll/arcade-fire-sprites
```
