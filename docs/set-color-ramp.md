# set color ramp

Sets the color ramp used when drawing fires spawned by this fire spawner. The color ramp is a 6 pixel wide, 1 pixel tall image that defines the colors used to draw the fire. The colors go from darkest to brightest as you move left to right. In general, the first pixel of the ramp should always be transparent in order for the fire sprites to have a transparent background.

All sprites from the spawner share the same color ramp, so changing the color ramp will change the colors of all existing sprites from that spawner.

```sig
let mySpawner = fireEffect.createFireSpawner(8, 16, 30)
fireEffect.setColorRamp(mySpawner, img`. 2 4 5 1 1`)
```

## Parameters

* **spawner**: The spawner to set the color ramp of.
* **ramp**: The color ramp to use. Must be 6 pixels wide and 1 pixel tall.

```package
arcade-fire-sprites=github:riknoll/arcade-fire-sprites
```
