// TODO might need to re-add the domElement stuff from SimpleControls.js

ENCOUNTERKEYS = new Object();

ENCOUNTERKEYS.onKeyUp = function (event) {
  switch(event.keyCode) {
    case 70: /*F*/ initFlyControls(); console.info('switched to fly controls'); break;
  }
};

ENCOUNTERKEYS.onKeyDown = function (event) {
  // no op
};

document.addEventListener('keydown', bind(ENCOUNTERKEYS, ENCOUNTERKEYS.onKeyDown), false);
document.addEventListener('keyup', bind(ENCOUNTERKEYS, ENCOUNTERKEYS.onKeyUp), false);

function bind(scope, fn) {
  return function () {
    fn.apply(scope, arguments);
  };
};