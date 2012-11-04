"use strict";

var LIGHTS = new Array();

// main
init3d();
addHelpers();
initTestObjects();
document.body.appendChild(renderer.domElement);
initListeners();
console.log('init complete');
animate();

function initTestObjects() {
  var redSphere = new THREE.Mesh(new THREE.SphereGeometry(50, 20, 20), MATS.red);
  redSphere.position.x = 150;
  redSphere.position.y = 50;
  redSphere.position.z = 0;
  redSphere.castShadow = true;
  scene.add(redSphere);

  markerAt(0, 0, 0, MATS.green);
  markerAt(200, 0, 0);
  markerAt(0, 200, 0);
  markerAt(0, 0, 200);

  // note spotlights have a cone of effect
  LIGHTS[0] = new THREE.SpotLight(0xFFFFFF);
  LIGHTS[0].position.x = 10;
  LIGHTS[0].position.y = 50;
  LIGHTS[0].position.z = 130;
  LIGHTS[0].castShadow = true;
  markerAt(10, 50, 130, MATS.white);
  scene.add(LIGHTS[0]);

  // this light will move
  LIGHTS[1] = new THREE.PointLight(0xFFFFFF);
  LIGHTS[1].marker = markerAt(0, 0, 0, MATS.white);
  scene.add(LIGHTS[1]);

  // general grey fill
  LIGHTS[2] = new THREE.AmbientLight(0x333333);
  scene.add(LIGHTS[2]);

  // floor
  var planeGeo = new THREE.PlaneGeometry(1000, 1000, 64, 64);
  var planeMat = MATS.green;
  var plane = new THREE.Mesh(planeGeo, planeMat);
  // plane is one-sided!
  // plane inits as a wall facing the camera, turn away to make a floor
  plane.rotation.x = -90 * TO_RADIANS;
  // sink the floor to get shadows
  plane.position.y = -30;
  plane.receiveShadow = true;
  scene.add(plane);

  textAt(0, 0, 0, "hello");
}

function update(t) {
  // a light orbiting the Y axis
  var ORBIT_RADIUS = 200;
  LIGHTS[1].position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].marker.position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].position.z = Math.sin(t / 1000) * ORBIT_RADIUS;
  LIGHTS[1].marker.position.z = Math.sin(t / 1000) * ORBIT_RADIUS;

  //camera.position.x = 100;
  //camera.position.y = 100;
  //camera.position.z = -600;
  camera.position.x = Math.sin(t / 1000) * (WIDTH - MOUSE.x);
  camera.position.y = HEIGHT - MOUSE.y;
  camera.position.z = WIDTH - MOUSE.x;
  //camera.position.z = Math.cos(t / 1000) * (WIDTH - MOUSE.x);
  // you need to update lookAt every frame
  camera.lookAt(scene.position);
}