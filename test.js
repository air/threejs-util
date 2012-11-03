"use strict";

// var ORBIT_RADIUS = 300;
var LIGHTS = new Array();

// main
// TODO how does animate() loop?
init3d();
initTestObjects();
document.body.appendChild(renderer.domElement);
initListeners();
console.log('init complete');
animate();

function initTestObjects() {
  var radius = 50;
  var redSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 20, 20), MATS.red);
  redSphere.position.x = 150;
  redSphere.position.y = 50;
  redSphere.position.z = 0;
  redSphere.castShadow = true;
  scene.add(redSphere);

  markerAt(0, 0, 0, MATS.green);
  markerAt(200, 0, 0);
  markerAt(0, 200, 0);
  markerAt(0, 0, 200);

  LIGHTS[0] = new THREE.SpotLight(0xFFFFFF);
  LIGHTS[0].position.x = 10;
  LIGHTS[0].position.y = 50;
  LIGHTS[0].position.z = 130;
  LIGHTS[0].castShadow = true;
  markerAt(10, 50, 130, MATS.white);
  scene.add(LIGHTS[0]);

  LIGHTS[1] = new THREE.PointLight(0xFFFFFF);
  LIGHTS[1].position.x = -10;
  LIGHTS[1].position.y = -50;
  LIGHTS[1].position.z = -130;
  LIGHTS[1].marker = markerAt(-10, -50, -130, MATS.white);
  scene.add(LIGHTS[1]);

  var planeGeo = new THREE.PlaneGeometry(800, 800, 10, 10);
  var planeMat = MATS.green;
  var plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = 0;
  plane.position.y = -100;
  plane.receiveShadow = true;
  scene.add(plane);

  var c = document.createElement('canvas');
  c.getContext('2d').font = '50px Arial';
  c.getContext('2d').fillText('Text', 2, 50);
  var tex = new THREE.Texture(c);
  tex.needsUpdate = true;
  var mat = new THREE.MeshBasicMaterial({
    map : tex
  });
  mat.transparent = true;
  var textQuad = new THREE.Mesh(new THREE.PlaneGeometry(c.width, c.height), mat);
  textQuad.doubleSided = true;
  textQuad.rotation.x = 90;
  scene.add(textQuad);
}

// orbit camera around the Y axis by varying x and z
function update(t) {
  var ORBIT_RADIUS = 200;
  LIGHTS[1].position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].marker.position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].position.z = Math.sin(t / 1000) * ORBIT_RADIUS;
  LIGHTS[1].marker.position.z = Math.sin(t / 1000) * ORBIT_RADIUS;

  camera.position.x = Math.sin(t / 1000) * (WIDTH - MOUSE.x);
  camera.position.y = HALFHEIGHT - MOUSE.y;
  camera.position.z = WIDTH - MOUSE.x;
  camera.position.z = Math.cos(t / 1000) * (WIDTH - MOUSE.x);
  // you need to update lookAt every frame
  camera.lookAt(scene.position);
}