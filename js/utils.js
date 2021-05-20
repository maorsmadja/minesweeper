'use strict';

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setTime() {
  ++gTotalSeconds;
  gSecondsLabel.innerHTML = pad(gTotalSeconds % 60);
  gMinutesLabel.innerHTML = pad(parseInt(gTotalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}