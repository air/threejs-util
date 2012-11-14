"use strict";

// TODOs
// everything's centred on the zero Y plane, put the ground there

// obelisks
var OB = new Object();
OB.gridSizeX = 50;
OB.gridSizeZ = 50;
OB.spacing = 1000;
OB.MAX_X = (OB.gridSizeX - 1) * OB.spacing;
OB.MAX_Z = (OB.gridSizeZ - 1) * OB.spacing;
OB.geometry = new THREE.CylinderGeometry(40, 40, 100, 16, 1, false); // topRadius, bottomRadius, height, segments, heightSegments

var controls;

// main
init3d(OB.MAX_X);
addHelpers();
initEncounterObjects();
initControls();
document.body.appendChild(renderer.domElement);
initListeners();
console.log('init complete');
animate();

function initEncounterObjects() {
  for (var xpos=0; xpos<(OB.gridSizeX * OB.spacing); xpos+=OB.spacing) {
    for (var zpos=0; zpos<(OB.gridSizeZ * OB.spacing); zpos+=OB.spacing) {
      var obelisk = new THREE.Mesh(OB.geometry, MATS.normal);
      obelisk.position.x = xpos;
      obelisk.position.z = zpos;
      scene.add(obelisk);
    }
  }
}

// inits at origin pointing up the X axis
function initControls() {
  camera.position.z = OB.MAX_Z / 2;
  camera.position.x = OB.MAX_X / 2;
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 20; // default 1.0
  controls.lookSpeed = 0.001; // default 0.005
  controls.constrainVertical = true; // default false
  controls.verticalMin = 45 * TO_RADIANS;
  controls.verticalMax = 135 * TO_RADIANS;
}

function update(t) {
  controls.update(1);
}