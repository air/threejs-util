"use strict";

// Encounter: reverse engineering facts
// time for complete rotation: 9s
// time to pass 10 obelisks: 8s

// TODOs

// obelisks
var OB = new Object();
OB.gridSizeX = 50;
OB.gridSizeZ = 50;
OB.spacing = 1000;
OB.height = 100;
OB.radius = 40;
OB.MAX_X = (OB.gridSizeX - 1) * OB.spacing;
OB.MAX_Z = (OB.gridSizeZ - 1) * OB.spacing;
OB.geometry = new THREE.CylinderGeometry(OB.radius, OB.radius, OB.height, 16, 1, false); // topRadius, bottomRadius, height, segments, heightSegments

// player
var PLAYER = new Object();
PLAYER.cameraHeight = OB.height / 2;

// shots
var SHOT = new Object();
SHOT.radius = 45;
SHOT.geometry = new THREE.SphereGeometry(SHOT.radius);

// constants modelling the original game
var ENCOUNTER = new Object();
ENCOUNTER.drawDistance = 3000; // use with init3D()
ENCOUNTER.movementSpeed = 1.2;
ENCOUNTER.turnSpeed = 0.0007;
ENCOUNTER.shotSpeed = 1.8; // TODO confirm

// objects we want visible in the debugger
var controls;
var GROUND = new Object();

// main
init3d(OB.MAX_X);
scene.add(new THREE.AxisHelper(300));
initEncounterObjects();
initEncounterControls();
document.body.appendChild(renderer.domElement);
initListeners();
console.info('init complete');
animate();

function initEncounterObjects() {
  // TODO consider adding all obelisks to an invisible parent object
  for (var xpos=0; xpos<(OB.gridSizeX * OB.spacing); xpos+=OB.spacing) {
    for (var zpos=0; zpos<(OB.gridSizeZ * OB.spacing); zpos+=OB.spacing) {
      var obelisk = new THREE.Mesh(OB.geometry, MATS.normal);
      obelisk.position.set(xpos, OB.height / 2, zpos);
      scene.add(obelisk);
    }
  }
  console.info('obelisks placed')

  // ground plane. Lots of segments will KILL your fps
  GROUND.geometry = new THREE.PlaneGeometry(OB.MAX_X, OB.MAX_Z, 16, 16);
  //GROUND.material = new THREE.MeshLambertMaterial({ color : C64.palette.green });
  GROUND.material = MATS.normal;
  GROUND.material.side = THREE.DoubleSide; // TODO remove this
  GROUND.object = new THREE.Mesh(GROUND.geometry, GROUND.material);
  // plane inits as a wall on X axis facing the positive Z space, turn away to make a floor
  GROUND.object.rotation.x = -90 * TO_RADIANS;
  // plane is anchored at its centre
  GROUND.object.position.x = OB.MAX_X / 2;
  GROUND.object.position.z = OB.MAX_Z / 2;
  // zero Y is ground
  GROUND.object.position.y = 0;
  GROUND.object.receiveShadow = true;
  scene.add(GROUND.object);
  console.info('ground plane placed');

  camera.position.set(OB.MAX_X / 2, PLAYER.cameraHeight, OB.MAX_Z / 2);
}

// can be invoked at runtime
function initFlyControls() {
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 2.0;
  controls.lookSpeed = 0.0001;
  controls.constrainVertical = true; // default false
  controls.verticalMin = 45 * TO_RADIANS;
  controls.verticalMax = 135 * TO_RADIANS;
}

function initEncounterControls() {
  controls = new SimpleControls(camera);
  controls.movementSpeed = ENCOUNTER.movementSpeed;
  controls.turnSpeed = ENCOUNTER.turnSpeed;
}

function update(t) {
  controls.update(t);
}