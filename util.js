"use strict";

if (UTIL == null || typeof(UTIL) != "object") { var UTIL = new Object(); } else { console.error('can\'t reserve namespace UTIL'); }

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

// TODO: move all this stuff under this namespace
if (MY3 == null || typeof(MY3) != "object") { var MY3 = new Object(); } else { console.error('can\'t reserve namespace MY3'); }

// init timing
MY3.time = new Date().getTime();

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

// optional args:
// far - draw distance, defaults to 10,000
function init3d(far) {
  var VIEW_ANGLE = 45; // degrees not radians
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1; // objects closer than this won't render
  var FAR = (typeof far === "undefined") ? 10000 : far;

  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;

  MATS.red = new THREE.MeshLambertMaterial({ color : 0xDD0000 });
  MATS.blue = new THREE.MeshLambertMaterial({ color : 0x0000DD });
  MATS.green = new THREE.MeshLambertMaterial({ color : 0x00DD00 });
  MATS.white = new THREE.MeshLambertMaterial({ color : 0xFFFFFF });
  MATS.yellow = new THREE.MeshLambertMaterial({ color : 0xFFFF00 });
  MATS.normal = new THREE.MeshNormalMaterial();

  MATS.lineVertex = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

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

// extended THREE.Line
MY3.Line = function(startPos, endPos) {
  var lineGeometry = new THREE.Geometry();
  lineGeometry.vertices.push(startPos);
  lineGeometry.vertices.push(endPos);
  lineGeometry.colors.push(new THREE.Color( 0xff0000 ));
  lineGeometry.colors.push(new THREE.Color( 0x0000ff ));
  THREE.Line.call(this, lineGeometry, MATS.lineVertex); // super constructor
};
MY3.Line.prototype = Object.create(THREE.Line.prototype);
MY3.Line.prototype.setEnd = function(position) {
  // no op - will this animate/update correctly if we change the geometry?
};

// mat is optional, defaults to yellow
// req: scene
function markerAt(x, y, z, mat) {
  if (!mat) {
    mat = MATS.yellow;
  }
  var marker = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16), mat);
  marker.position.set(x, y, z);
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
  textQuad.position.set(x, y, z);
  scene.add(textQuad);
  return textQuad;
}

// add mouse listener
// init mouse to center
// req: onDocumentMouseMove
function initListeners() {
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

  // TODO I think we could get this from STATS, at the cost of dependency
  var now = new Date().getTime();
  var delta = now - MY3.time;
  MY3.time = now;
  update(delta);

  render();
  STATS.update();
}

