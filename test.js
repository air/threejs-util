"use strict";

var renderer, camera, scene;
var redMat, blueMat, greenMat, whiteMat;
var orbitCounter;
var ORBIT_RADIUS = 300;

init();
animate();

// mat is optional, defaults to white
function markerAt(x, y, z, mat) {
  if (!mat) {
    mat = whiteMat;
  }
  var marker = new THREE.Mesh(new THREE.SphereGeometry(10, 8, 8), mat);
  marker.position.x = x;
  marker.position.y = y;
  marker.position.z = z;
  scene.add(marker);
}

function init() {
  var WIDTH = window.innerWidth;
  var HEIGHT = window.innerHeight;
  var VIEW_ANGLE = 45;
  var ASPECT = WIDTH / HEIGHT;
  var NEAR = 0.1;
  var FAR = 10000;

  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene = new THREE.Scene();
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);

  camera.position.y = 50;
  camera.position.z = 300;

  redMat = new THREE.MeshLambertMaterial({
    color : 0xDD0000
  });
  blueMat = new THREE.MeshLambertMaterial({
    color : 0x0000DD
  });
  greenMat = new THREE.MeshLambertMaterial({
    color : 0x00DD00
  });
  whiteMat = new THREE.MeshLambertMaterial({
    color : 0xFFFFFF
  });

  var radius = 50;
  var segments = 16;
  var rings = 16;
  var redSphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), redMat);
  redSphere.position.x = 150;
  redSphere.position.y = 50;
  redSphere.position.z = 0;
  scene.add(redSphere);

  markerAt(0, 0, 0, greenMat);
  markerAt(100, 0, 0);
  markerAt(0, 100, 0);
  markerAt(0, 0, 100);

  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;
  scene.add(pointLight);

  document.body.appendChild(renderer.domElement);

  console.log('init complete');
}

// orbit camera around the Y axis by varying x and z
function update(t) {
  camera.position.x = Math.sin(t / 1000) * 300;
  camera.position.y = 150;
  camera.position.z = Math.cos(t / 1000) * 300;
  // you need to update lookAt every frame
  camera.lookAt(scene.position);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  update(new Date().getTime());
  render();
}