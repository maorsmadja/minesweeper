'use strict';


function inIt() {
  resetData();
  renderBoard(buildBoard());
  document.querySelector('.status-btn').innerHTML = NORMAL;
}

function setLevel(size, mines) {
  gLevel.SIZE = size;
  gLevel.MINES = mines;
  gLives = (gLevel.SIZE > 4) ? 3 : 2
  inIt();
}

function buildBoard() {
  gBoard = [];
  for (var i = 0; i < gLevel.SIZE; i++) {
    gBoard[i] = [];
    for (var j = 0; j < gLevel.SIZE; j++) {
      gBoard[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  gGame.isOn = true;
  gNumOfCells = gLevel.SIZE * gLevel.SIZE;
  gCellsToWin = gNumOfCells - gLevel.MINES;
  isClicked = false;
  return gBoard
}

function renderBoard(board) {
  var elBoard = document.querySelector('.board');
  var elLives = document.querySelector('.lives');
  if (gLives === 3) elLives.innerHTML = THREELIVES;
  if (gLives === 2) elLives.innerHTML = TWOLIVES
  if (gLives === 1) elLives.innerHTML = LIVES;
  if (gLives === 0) elLives.innerHTML = '';
  var strHtml = '';
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var minesAround = getMinesNegsCount(i, j, gBoard);
      var opacityClass = board[i][j].isShown ? 'clicked' : ''; // Added
      strHtml += `<td class='cell cell-${i}-${j} ${opacityClass}' onclick =
      'cellClicked(this,${i},${j}) 'oncontextmenu = 'cellMarked(this,${i},${j})'>`
      if (board[i][j].isMarked) strHtml += FLAG;
      else if (board[i][j].isShown) {
        if (board[i][j].isMine) strHtml += MINE;
        else if (!board[i][j].isMine && minesAround === 0) strHtml += '';
        else if (!board[i][j].isMine && minesAround !== 0) strHtml += minesAround;

      }
      strHtml += "</td>";
    }
    strHtml += "</tr>";
  }
  elBoard.innerHTML = strHtml;
}

function getMinesNegsCount(cellI, cellJ, board) {
  var count = 0;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === cellI && j === cellJ) continue;
      if (board[i][j].isMine) count++;
    }
  }
  return count;
}

function cellClicked(elCell, i, j) {
  // do nothing if the game is off or cell already showen
  if (!gGame.isOn || gBoard[i][j].isShown) return;
  gBoard[i][j].isShown = true;

  /* Game over if the ncell who pressed wased mine
  or win the game if all cells showwen: */
  if (gBoard[i][j].isMine) {
    gLives--;
    gBoard[i][j].isShown = true;
    if (gLives === 0) return gameOver(gBoard);
  }

  // Set what we will see after cell pressing:
  var minesCount = getMinesNegsCount(i, j, gBoard);
  gBoard[i][j].minesAroundCount = minesCount;

  // open around cells if the pressed cell was with 0 mines around:
  if (minesCount === 0 && !gBoard[i][j].isMine) openAround(i, j, gBoard);

  // remvoe flag if the pressed cell was with 
  if (gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false;
    gGame.markedCount--;
  }

  // set mines after first click only:
  if (!isClicked) {
    isClicked = true;
    setMines(gLevel.MINES);
    gTimer = setInterval(setTime, 1000);
  }
  renderBoard(gBoard);
  checkStatus(gBoard);
}

function cellMarked(elCell, i, j) {
  if (!gGame.isOn || gBoard[i][j].isShown) return;
  if (gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = false;
    gGame.markedCount--;
    elCell.innerHTML = '';
    console.log('flags:', gGame.markedCount);
  }
  else {
    gBoard[i][j].isMarked = true;
    gGame.markedCount++;
    elCell.innerHTML = FLAG;
    console.log('flags:', gGame.markedCount);
  }
}

function gameOver(board) {
  console.log('game over');
  gGame.isOn = false;
  clearInterval(gTimer);
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j].isMine) {
        board[i][j].isShown = true;
        if (board[i][j].isMarked) {
          board[i][j].isMarked = false;
          gGame.markedCount--;
        }
      }
    }
  }
  renderBoard(gBoard);
  var elEmoji = document.querySelector('.status-btn');
  elEmoji.innerHTML = LOSER;
}

function checkStatus(board) {
  var count = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      // if(board[i][j].isShown && !board[i][j].isMine) return winTheGame();
      if (board[i][j].isShown) {
        count++;
      }
    }
  }
  gGame.shownCount = count;
  if (gGame.shownCount >= gCellsToWin) winTheGame();
  console.log('gCellsToWin', gCellsToWin);
  console.log('gGame.shownCount', gGame.shownCount);
  console.log('flags:', gGame.markedCount);
}

function winTheGame() {
  gGame.isOn = false;
  clearInterval(gTimer);
  var elEmoji = document.querySelector('.status-btn');
  elEmoji.innerHTML = WINNER;
  console.log('winner');
}

function setMines(amount) {
  if (gGame.mines < amount) {
    var i = getRandomNum(0, gLevel.SIZE - 1); // Added
    var j = getRandomNum(0, gLevel.SIZE - 1); // Added
    if (gBoard[i][j].isMine || gBoard[i][j].isShown) {
      setMines(gLevel.MINES);
      return;
    }
    gBoard[i][j].isMine = true;
    gGame.mines++;
    setMines(gLevel.MINES);
    return;
  }
  renderBoard(gBoard);
}

function resetData() {
  gBoard = [];
  gGame.isOn = true;
  gGame.mines = 0;
  gGame.shownCount = 0;
  gGame.markedCount = 0;
  gGame.secsPassed = 0;
  gNumOfCells = gLevel.SIZE * gLevel.SIZE;
  gCellsToWin = gNumOfCells - gLevel.MINES;
  isClicked = false;
  gMinutesLabel.innerHTML = "00"
  gSecondsLabel.innerHTML = "00"
  gTotalSeconds = 0;
  gLives = (gLevel.SIZE === 4) ? 2 : 3
  console.log('gLives', gLives);
  clearInterval(gTimer);
}

function openAround(cellI, cellJ, board) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === cellI && j === cellJ) continue;
      board[i][j].isShown = true;
      gGame.shownCount++;
      renderBoard(gBoard);
    }
  }
}
