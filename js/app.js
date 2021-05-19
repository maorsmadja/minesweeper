'use strict';

const MINE = 'X';
const FLAG = 'F';

var gLevel = {
  SIZE: 4,
  MINES: 2
}
var gBoard = [];

var gGame = {
  isOn: false,
  shownCount: 0, //How many cells are shown
  markedCount: 0, //How many cells are marked (with a flag)
  secsPassed: 0 //How many seconds passed
}

function inIt() {
  gBoard = buildBoard();
  renderBoard(gBoard);
}

function setMinesNegsCount(rowIdx, colIdx, board) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i >= 0 && i < board.length) {
      for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (j >= 0 && j < board.length) {
          if (board[i][j].isMine) {
            board[rowIdx][colIdx].minesAroundCount++
          }
        }
      }
    }
  }
  return board[rowIdx][colIdx].minesAroundCount;
}

function cellClicked(elCell, i, j) {
  if (!gGame.isOn || gBoard[i][j].isShown) return;
  if (gBoard[i][j].isMine) return gameOver();
  var minesCount = setMinesNegsCount(i, j, gBoard);
  gBoard[i][j].isShown = true;
  gBoard[i][j].minesAroundCount = minesCount;
  renderBoard(gBoard);
}

function cellMarked(elCell) {
  if (gGame.isOn && !gBoard.isShown) {
    if (!gBoard.isMarked) {
      elCell.textContent = FLAG;
      gBoard.isMarked = true;
      gGame.markedCount++;
      console.log(gGame.markedCount);
    } else {
      elCell.textContent = '';
      gBoard.isMarked = false;
      if (gGame.markedCount >= 0) gGame.markedCount--;
      console.log(gGame.markedCount);
    }
  }
}

function gameOver() {
  console.log('game over');
  gGame.isOn = false;

}

function checkGameOver() {
  //TODO
}