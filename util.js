"use strict";

//=============================================================================
// general js
//=============================================================================
function random(max) {
  return random(0, max);
}
function random(min, max) {
  if (max > min) {
    var range = max - min;
    return Math.floor(Math.random() * (range + 1)) - max;
  } else {
    console.log('max should be more than min');
    return 0;
  }
}
//=============================================================================
// three.js
//=============================================================================
// rendering objects
var renderer, camera, scene;
// x and y
var MOUSE = {};
// dimensions
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var HALFWIDTH = window.innerWidth / 2;
var HALFHEIGHT = window.innerHeight / 2;
// material constants
var MATS = {};
// fps counter
var STATS;

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

  STATS = new Stats();
  STATS.domElement.style.position = 'absolute';
  STATS.domElement.style.top = '0px';
  document.body.appendChild(STATS.domElement);
}

// mat is optional, defaults to yellow
// req: scene
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

// add p to pause
// add mouse listener
// init mouse to center
// req: onDocumentMouseMove
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

// capture mouse moves
function onDocumentMouseMove(event) {
  MOUSE.x = event.clientX;
  MOUSE.y = event.clientY;
}

function render() {
  renderer.render(scene, camera);
}

// TODO how does animate() loop?
// req: update(t)
function animate() {
  requestAnimationFrame(animate);
  update(new Date().getTime());
  render();
  STATS.update();
}

