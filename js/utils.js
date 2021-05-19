'use strict';

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    gGame.isOn = true;
    board[1][2].isMine = true;
    board[3][2].isMine = true;
    return board
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        // strHtml += "<tr oncontextmenu='return false'>"
        for (var j = 0; j < board[0].length; j++) {
            strHtml += `<td class = 'cell cell-${i}-${j}' onclick =
             'cellClicked(this,${i},${j}) 'oncontextmenu = 'cellMarked(this,${i},${j})'>`
             if (board[i][j].isMine && board[i][j].isShown) {
                strHtml += MINE
            }
            else if (board[i][j].minesAroundCount && board[i][j].isShown) {
                strHtml += board[i][j].minesAroundCount;
            }
            strHtml += "</td>"
        }
        strHtml += "</tr>"
    }
    elBoard.innerHTML = strHtml;
}

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}