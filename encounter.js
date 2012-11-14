"use strict";

var NUM_PILLARS_X = 50;
var NUM_PILLARS_Z = 50;
var PILLAR_SPACING = 500;

// main
init3d();
addHelpers();
initEncounterObjects();
document.body.appendChild(renderer.domElement);
initListeners();
console.log('init complete');
animate();

function initEncounterObjects() {
  markerAt(0,0,0, MATS.normal);
  scene.add(new THREE.AmbientLight(0x505050));

  var pillarGeometry = new THREE.CylinderGeometry(30, 30, 100, 16, 1, false); // topRadius, bottomRadius, height, segments, heightSegments

  for (var xpos=0; xpos<(NUM_PILLARS_X * PILLAR_SPACING); xpos+=PILLAR_SPACING) {
    for (var zpos=0; zpos<(NUM_PILLARS_Z * PILLAR_SPACING); zpos+=PILLAR_SPACING) {
      var cylinder = new THREE.Mesh(pillarGeometry, MATS.normal);
      cylinder.position.x = xpos;
      cylinder.position.z = zpos;
      scene.add(cylinder);
    }
  }
}

function update(t) {
  camera.position.x = Math.sin(t / 2000) * (WIDTH - MOUSE.x);
  camera.position.y = 150;
  camera.position.z = Math.cos(t / 2000) * (WIDTH - MOUSE.x);
  // you need to update lookAt every frame
  camera.lookAt(scene.position);
}