"use strict";

//=============================================================================
// general js
//=============================================================================
var TO_RADIANS = Math.PI / 180;
var TO_DEGREES = 180 / Math.PI;

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

// grab a namespace
if (MY3 == null || typeof(MY3) != "object") { var MY3 = new Object(); } else { console.error('can\'t reserve namespace MY3'); }

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

// TODO add custom counters to STATS

function init3d() {
  var VIEW_ANGLE = 45; // degrees not radians
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1; // objects closer than this won't render
  var FAR = 10000; // objects further away than this won't render

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
  MATS.normal = new THREE.MeshNormalMaterial();

  STATS = new Stats();
  STATS.domElement.style.position = 'absolute';
  STATS.domElement.style.top = '0px';
  document.body.appendChild(STATS.domElement);
}

function addHelpers(){
  var axis = new THREE.AxisHelper(300);
  scene.add(axis);
  var camHelp = new THREE.CameraHelper(camera);
  scene.add(camHelp);
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

// text will appear to top left of point, facing the camera
function textAt(x, y, z, text) {
  // make a canvas...
  var c = document.createElement('canvas');
  c.getContext('2d').font = '50px Arial';
  c.getContext('2d').fillText(text, 2, 50);
  // ...into a texture
  var tex = new THREE.Texture(c);
  tex.needsUpdate = true;
  // create material
  var mat = new THREE.MeshBasicMaterial({
    map : tex,
    transparent : true,
    side : THREE.DoubleSide
  });
  var textQuad = new THREE.Mesh(new THREE.PlaneGeometry(c.width/2, c.height/2), mat);
  textQuad.position.x = x;
  textQuad.position.y = y;
  textQuad.position.z = z;
  scene.add(textQuad);
  return textQuad;
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

// req: update(t)
function animate() {
  requestAnimationFrame(animate);
  update(new Date().getTime());
  render();
  STATS.update();
}

