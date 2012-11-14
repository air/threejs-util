"use strict";

var LIGHTS = new Array(); // not a constant, drop caps?
var controls;

// main
init3d();
addHelpers();
initTestObjects();
//initFlyControls();
initFirstPersonControls();
//initPointerLockControls();
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
  markerAt(10, 50, 130, MATS.normal);
  scene.add(LIGHTS[0]); 

  // this light will move
  LIGHTS[1] = new THREE.PointLight(0xFFFFFF);
  LIGHTS[1].marker = markerAt(0, 0, 0, MATS.normal);
  scene.add(LIGHTS[1]);

  // general grey fill
  LIGHTS[2] = new THREE.AmbientLight(0x333333);
  scene.add(LIGHTS[2]);

  // floor
  var planeGeo = new THREE.PlaneGeometry(1000, 1000, 64, 64);
  var planeMat = MATS.green;
  // give the material a back side
  planeMat.side = THREE.DoubleSide;
  var plane = new THREE.Mesh(planeGeo, planeMat);
  // plane inits as a wall facing the camera, turn away to make a floor
  plane.rotation.x = -90 * TO_RADIANS;
  // sink the floor to get shadows
  plane.position.y = -30;
  plane.receiveShadow = true;
  scene.add(plane);

  textAt(0, 0, 0, "hello");

  camera.position.z=1000;
}

// fly controls will roll all over the place
function initFlyControls(){
  controls = new THREE.FlyControls(camera);
  controls.movementSpeed = 5; // default 1.0
  //controls.rollSpeed = 0.1; // default 0.005
  controls.dragToLook = true;
}

// first person controls never roll
// FIXME always inits facing away from origin!
function initFirstPersonControls() {
  controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 5; // default 1.0
  controls.lookSpeed = 0.001; // default 0.005
  controls.constrainVertical = true; // default false
  controls.verticalMin = 45 * TO_RADIANS;
  controls.verticalMax = 135 * TO_RADIANS;

}

// TODO: seems complex to get the mouse https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_pointerlock.html
function initPointerLockControls() {
  // https://github.com/mrdoob/three.js/issues/2591
  //controls = new PointerLockControls(camera);
  console.log("not implemented");
}

function update(t) {
  // a light orbiting the Y axis
  // FIXME use the OrbitControls!
  var ORBIT_RADIUS = 200;
  LIGHTS[1].position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].marker.position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].position.z = Math.sin(t / 1000) * ORBIT_RADIUS;
  LIGHTS[1].marker.position.z = Math.sin(t / 1000) * ORBIT_RADIUS;

  // TODO functions for varyWithMouse and sinWave
  //camera.position.x = Math.sin(t / 1000) * (WIDTH - MOUSE.x);
  //camera.position.y = HEIGHT - MOUSE.y;
  //camera.position.z = WIDTH - MOUSE.x;
  //camera.position.z = Math.cos(t / 1000) * (WIDTH - MOUSE.x);

  // FIXME for delta updates and smoothness
  controls.update(1);

  // you need to update lookAt every frame
  //camera.lookAt(scene.position);
}