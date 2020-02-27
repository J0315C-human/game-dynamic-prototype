## UI-based prototype of an idea for a game dynamic.

How the game will work:
- you are in charge of a little microcosm world of creatures.
- there are 4 "levels" of creatures. You start with just level 1, "c1" creatures.
- higher-level creatures can do more things, or the same things with different costs.
- to create a creature at a higher level, you must merge two of the lower level together.
- there are plants (food) and hats (powerups).
- plants give the creatures energy.
- there are 4 levels of plants, also. higher-level plants provide more energy.
- creatures can eat plants at or below their own level.
- creatures can expend energy to create plants one below their own level.
- creatures can create 'hats' by expending energy.
- some creatures can spawn new "c1" creatures by expending energy.
- creatures slowly lose energy 
- hats will afford the creatures better speed, efficiency, or other "powers".
- higher-level creatures can do things more autonomously or automatically.
- because of this, the gameplay will evolve from a very manage, manual system that you have to take care of yourself, into one where the "mature" creatures are helping you out, or the powerups are providing "automation" benefits.
- it's a start!



### dev notes:
To start the development server: `npm start`

- building requires src/main.ts and src/assets/index.html
- css files will work
- class/id hashing is disabled (modules: false) in webpack config
