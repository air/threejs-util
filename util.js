"use strict";

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