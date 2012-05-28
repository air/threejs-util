"use strict";

var renderer, camera, scene;
var STATS;
var MATS = {};
// var ORBIT_RADIUS = 300;
var MOUSE = {};
var LIGHTS = new Array();
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var HALFWIDTH = window.innerWidth / 2;
var HALFHEIGHT = window.innerHeight / 2;

// main
// TODO how does animate() loop?
init3d();
initListeners();
console.log('init complete');
animate();

// mat is optional, defaults to yellow
function markerAt(x, y, z, mat) {
  if (!mat) {
    mat = MATS.yellow;
  }
  var marker = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16), mat);
  marker.position.x = x;
  marker.position.y = y;
  marker.position.z = z;
  marker.castShadow = true;
  scene.add(marker);
  return marker;
}

function init3d() {
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1;
  var FAR = 10000;

  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;

  MATS.red = new THREE.MeshLambertMaterial({
    color : 0xDD0000
  });
  MATS.blue = new THREE.MeshLambertMaterial({
    color : 0x0000DD
  });
  MATS.green = new THREE.MeshLambertMaterial({
    color : 0x00DD00
  });
  MATS.white = new THREE.MeshLambertMaterial({
    color : 0xFFFFFF
  });
  MATS.yellow = new THREE.MeshLambertMaterial({
    color : 0xFFFF00
  });

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

  STATS = new Stats();
  STATS.domElement.style.position = 'absolute';
  STATS.domElement.style.top = '0px';
  document.body.appendChild(STATS.domElement);

  document.body.appendChild(renderer.domElement);
}

function initListeners() {
  // stop the script if we hit 'p' and debugger is open
  $(window).keydown(function(e) {
    if (e.keyCode == 80) {
      debugger;
    }
  });
  // capture mouse moves
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  MOUSE.x = HALFWIDTH;
  MOUSE.y = HALFHEIGHT;
}

// jerky and boring
function changeLights() {
  var x = random(-200, 200);
  var y = random(-200, 200);
  var z = random(-200, 200);
  LIGHTS[1].position.x = x;
  LIGHTS[1].position.y = y;
  LIGHTS[1].position.z = z;
  LIGHTS[1].marker.position.x = x;
  LIGHTS[1].marker.position.y = y;
  LIGHTS[1].marker.position.z = z;
}

// orbit camera around the Y axis by varying x and z
function update(t) {
  var ORBIT_RADIUS = 200;
  LIGHTS[1].position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].marker.position.x = Math.cos(t / 1000) * -ORBIT_RADIUS;
  LIGHTS[1].position.z = Math.sin(t / 1000) * ORBIT_RADIUS;
  LIGHTS[1].marker.position.z = Math.sin(t / 1000) * ORBIT_RADIUS;

  // camera.position.x = Math.sin(t / 1000) * (WIDTH - MOUSE.x);
  camera.position.y = HALFHEIGHT - MOUSE.y;
  camera.position.z = WIDTH - MOUSE.x;
  // camera.position.z = Math.cos(t / 1000) * (WIDTH - MOUSE.x);
  // you need to update lookAt every frame
  // camera.lookAt(scene.position);
}

// capture mouse moves
function onDocumentMouseMove(event) {
  MOUSE.x = event.clientX;
  MOUSE.y = event.clientY;
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  update(new Date().getTime());
  render();
  STATS.update();
}