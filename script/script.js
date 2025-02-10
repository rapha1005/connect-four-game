const $gamecells = document.querySelectorAll('.board-cell')
const $startGameBtn = document.querySelector('.start-game-btn')
const $menu = document.querySelector('.menu')
const $game = document.querySelector('.game')

let board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];

let currentPlayer = "x";

$gamecells.forEach((gameCell) => {
    gameCell.addEventListener('click', function () {
        dropToken(gameCell)
    });

});


function dropToken(gameCell){
    let cellX = parseInt(gameCell.getAttribute('data-x'));
    let cellY = findEmptyRowInColumn(cellX); 
    if (cellY !== -1) {
        updateGame(cellX, cellY);
    }else{
        alert('non, non, non')
    }
}

function findEmptyRowInColumn(x) {
    for (let y = board.length - 1; y >= 0; y--) {
        if (board[y][x] === "") {
            return y; 
        }
    }
    return -1;
}

function updateGame(x, y) {
    board[y][x] = currentPlayer;

    if (currentPlayer === "x") {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('yellow-circle');
    } else {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('red-circle');
    }

    currentPlayer = (currentPlayer === "x") ? "o" : "x";
    console.log(board);
}



$startGameBtn.addEventListener('click', () =>{
    $menu.classList.add('hidden')
    $game.classList.remove('hidden')
})