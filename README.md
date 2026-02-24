# arcade-fire-sprites

A MakeCode Arcade extension for creating procedurally generated fire sprites.

To use, create a fire spawner and use that spawner to spawn fire sprites.

Fire spawners manage the number of fire simulations running at once. If you are spawning a lot of fire sprites, the spawner will reuse existing fire simulations instead of creating new ones, which improves performance. The number of simultaneous fire simulations is determined by the max sources parameter All fire sprites from a spawner share the same dimensions, strength, color ramp, and update/sputter intervals. If your game needs different types of fire, you should create one fire spawner for each type (e.g. one for lanterns, one for campfires, one for attacks, etc.)

