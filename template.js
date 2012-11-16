"use strict";

var controls;

// main
init3d();
initFirstPersonControls();
addHelpers();
initObjects();
document.body.appendChild(renderer.domElement);
initListeners();
console.log('init complete');
animate();

function initFirstPersonControls() {
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 0.1; // default 1.0
  controls.lookSpeed = 0.0001; // default 0.005
  controls.constrainVertical = true; // default false
  controls.verticalMin = 45 * TO_RADIANS;
  controls.verticalMax = 135 * TO_RADIANS;
}

function initObjects() {
  markerAt(0, 0, 0, MATS.normal);
  camera.position.z=1000;
  camera.lookAt(scene.position);
}

function update(t) {
  controls.update(t);
}