# set sputter interval

Sets the sputter interval of the given fire spawner. The sputter interval controls how often the fire will sputter, which is when the fire randomly decreases in strength for a few frame to create a more natural flickering effect. Higher values will result in less frequent sputterning. the sputtering frequency of all existing sprites from that spawner.

```sig
let mySpawner = fireEffect.createFireSpawner(8, 16, 30)
fireEffect.setSputterInterval(mySpawner, 30)
```

## Parameters

* **spawner**: The spawner to set the sputter interval of.
* **interval**: The number of frames between sputter events. Higher values will result in less frequent sputterning.

```package
arcade-fire-sprites=github:riknoll/arcade-fire-sprites
```
