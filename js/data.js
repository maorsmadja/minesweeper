'use strict';

const MINE = '💣';
const FLAG = '🚩';
const LIVES = '💙';
const TWOLIVES = '💙💙';
const THREELIVES = '💙💙💙';
const WINNER = '😎';
const LOSER = '☠️';
const NORMAL = '😀';

/*
LEVELS:
* Easy - size 4, mines 2
* Medium - size 8, mines 12
* hard - size 12, mines 30
*/

var gLevel = {
  SIZE: 4,
  MINES: 2,
  LIVES: 1
}


var gBoard = [];
var gCellsToWin = 0;
var gNumOfCells = 0;

var gLives = 1;

var isClicked = false;

// Timer:
var gMinutesLabel = document.getElementById("minutes");
var gSecondsLabel = document.getElementById("seconds");
var gTotalSeconds = 0;
var gTimer;

var gGame = {
  isOn: false,
  mines: 0,
  shownCount: 0, //How many cells are shown
  markedCount: 0, //How many cells are marked (with a flag)
  secsPassed: 0 //How many seconds passed
}