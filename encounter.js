"use strict";

// main
init3d();
initEncounterObjects();
document.body.appendChild(renderer.domElement);
initListeners();
console.log('init complete');
animate();

function initEncounterObjects() {
  markerAt(0,0,0);
}

function update(t) {
  camera.position.x = Math.sin(t / 1000) * (WIDTH - MOUSE.x);
  camera.position.z = Math.cos(t / 1000) * (WIDTH - MOUSE.x);
  // you need to update lookAt every frame
  camera.lookAt(scene.position);
}