'use strict';

var UTIL = {};

//=============================================================================
// maths
//=============================================================================
UTIL.TO_RADIANS = Math.PI / 180;
UTIL.TO_DEGREES = 180 / Math.PI;

UTIL.random = function(min, max)
{
  // handle a single arg to mean 'between 0 and arg'
  if (typeof max === 'undefined')
  {
    max = min;
    min = 0;
  }

  if (max > min)
  {
    var range = max - min + 1;
    return min + Math.floor(Math.random() * range);
  }
  else
  {
    error('max ' + max + ' must be more than min ' + min);
    return 0;
  }
}

//=============================================================================
// logging
//=============================================================================
function log(msg)
{
  console.log(Math.floor(window.performance.now()) + ' ' + msg);
}

function error(msg)
{
  console.error(Math.floor(window.performance.now()) + ' ' + msg);
}

//=============================================================================
// touch and mobile
//=============================================================================
UTIL.platformSupportsTouch = function()
{
  // FIXME returns false positive on Windows 8
  return 'ontouchstart' in window;
}

//=============================================================================
// make available in nodejs
//=============================================================================
if (typeof exports !== 'undefined')
{
  module.exports = UTIL;
}