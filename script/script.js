const $gamecells = document.querySelectorAll('.board-cell')
const $startGameBtn = document.querySelector('.start-game-btn')
const $menu = document.querySelector('.menu')
const $game = document.querySelector('.game')
const $rulesBtn = document.querySelector('.rules-btn')
const $winnerIndicator = document.querySelector('.winner-indicator')

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
    let cellY = findEmptyRow(cellX); 
    if (cellY !== -1) {
        updateGame(cellX, cellY);
    }else{
        alert('non, non, non')
    }
}

function findEmptyRow(x) {
    for (let i = 5; i >= 0; i--) {
        if (board[i][x] === "") {
            return i; 
        }
    }
    return -1;
}

function checkWin(x, y){
    console.log(board[y][x]+ "ok")
    let score = 0
    for(let i = 1; i<4; i++){
        if(board[y][x + i] === currentPlayer){
            score++
        }
    }
    for(let i = 0; i<4; i++){
    
        if(board[y][x - i] === currentPlayer){
            score++
        }
    }

    score === 4 ? alertWin() : score = 0

    for(let i = 0; i<4; i++){
        if (y + i < board.length && board[y + i][x] === currentPlayer){
            score++
        }
    }

    score === 4 ? alertWin() : score = 0

}

function alertWin() { 
    $game.style.pointerEvents = "none";

    if (currentPlayer === "x") {
        $winnerIndicator.style.backgroundColor = "#FFCE67";
    } else {
        $winnerIndicator.style.backgroundColor = "#FD6687";
    }

    setTimeout(() => {
        restartGame()
    }, 5000);
}


function updateGame(x, y) {
    board[y][x] = currentPlayer;

    if (currentPlayer === "x") {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('yellow-circle');
        
    } else {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('red-circle');

    }
    checkWin(x, y)
    currentPlayer = (currentPlayer === "x") ? "o" : "x";
    console.log(board);
}


function restartGame(){
    board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ]
    currentPlayer = "x"
    $game.style.pointerEvents = "initial";
    $winnerIndicator.style.backgroundColor = "#5C2DD5";
    $gamecells.forEach((gameCell) =>{
        gameCell.className = "board-cell"
    })
}

$startGameBtn.addEventListener('click', () =>{
    $menu.classList.add('hidden')
    $game.classList.remove('hidden')
    $winnerIndicator.classList.remove('hidden')
})

$rulesBtn.addEventListener('click', () =>{
    window.open('https://steamuserimages-a.akamaihd.net/ugc/2053129740384007681/008613159A03A2D9A1A38C0F66FC3F3CBCF73C9C/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true', '_blank')
})