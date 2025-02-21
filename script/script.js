const $gamecells = document.querySelectorAll('.board-cell')
const $startGameBtn = document.querySelector('.start-game-btn')
const $menu = document.querySelector('.menu')
const $game = document.querySelector('.game')
const $gameBoard = document.querySelector('.player-board')
const $rulesBtn = document.querySelector('.rules-btn')
const $winnerIndicator = document.querySelector('.winner-indicator')
const $gameBoardRed = document.querySelector('.red-player p')
const $gameBoardYellow = document.querySelector('.yellow-player p')
const $playerPosIndicator = document.querySelector('.player')
const $gameRulesScreen = document.querySelector('.rules-screen')
const $gameRulesScreenBtn = document.querySelector('.close-rules-btn')
const $gamePauseMenuBtn = document.querySelector('.nav-home-btn')
const $gamePauseMenu = document.querySelector('.game-pause-menu')
const $currentTimeIndicator = document.querySelector('.time-indicator')
const $currentTimeIndicatorP = document.querySelector('.time-indicator p')
const $winnerAlert = document.querySelector('.winner')
let board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];


let player1Score = 0
let player2Score = 0
let currentPlayer = "o";
let previousStarter = "o"
let turnTimer = 15
let timerInterval;

$gamecells.forEach((gameCell) => {
    gameCell.addEventListener('click', function () {
        dropToken(gameCell)
    });
    gameCell.addEventListener('mouseover', () => {
        const rect = gameCell.offsetLeft;
        $playerPosIndicator.style.left = `${rect}px`;
    });
    
});


function dropToken(gameCell){
    let cellX = parseInt(gameCell.getAttribute('data-x'));
    let cellY = findEmptyRow(cellX); 
    if (cellY !== -1) {
        updateGame(cellX, cellY, false);
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
    

    score === 4 ? Win(currentPlayer) : score = 0

    for(let i = 0; i<4; i++){
        if (y + i < board.length && board[y + i][x] === currentPlayer){
            score++
        }
    }

    score === 4 ? Win(currentPlayer) : score = 0

    // diagonal

    for(let i = 0; i<4; i++){
        
        if(y + i <= 5 && x + i <= 6 && board[y + i][x + i] === currentPlayer){
            
            
           score++
        }
    }

    for(let i = 1; i<4; i++){
        if(y-i >= 0 && x-i >= 0&& board[y - i][x - i] === currentPlayer){
           score++
           
        }
    }
    score === 4 ? Win(currentPlayer) : score = 0

    // anti diagonal

    for(let i = 0; i<4; i++){
        if(y + i <board.length && x - i >= 0 && board[y + i][x - i] === currentPlayer){
           score++
        }
    }
    for(let i = 1; i<4; i++){
        if(y - i >= 0 && x - i < board.length && board[y - i][x + i] === currentPlayer){
            
           score++
        }
    }
    score === 4 ? Win(currentPlayer) : score = 0

}


function Win(winner) { 
    clearInterval(timerInterval)
    
    $winnerAlert.classList.add('hidden')

    if (winner === "x") {
        player1Score++
        $gameBoardYellow.textContent  = player1Score
        $winnerIndicator.style.backgroundColor = "#FFCE67";
        $winnerAlert.children[0].textContent = "PLAYER 2"
    } else if(winner === "o") {
        player2Score++
        $gameBoardRed.textContent  = player2Score 
        $winnerIndicator.style.backgroundColor = "#FD6687";
        $winnerAlert.children[0].textContent = "PLAYER 1"
    }else{
        alert('no winner')
    }


    document.querySelector('.winner button').addEventListener('click', () =>{
        console.log('wweee')
        restartGame()

    })

}


function updateGame(x, y, pass) {
    board[y][x] = currentPlayer;

    board.every(row => row.every(cell => cell !== "")) ? Win() : pass

    if(pass === false){
        if (currentPlayer === "x") {
            document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('yellow-circle');

        } else {
            document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('red-circle');
        }
        checkWin(x, y)
    }
    
    if(currentPlayer === "x"){
        document.querySelector('.player svg path').setAttribute('fill', '#FD6687')
        currentPlayer = "o"

        $currentTimeIndicator.children[0].textContent = "PLAYER 1’S TURN"
        $currentTimeIndicator.classList.add('red-turn')
        $currentTimeIndicator.classList.remove('yellow-turn')
    }else{
        document.querySelector('.player svg path').setAttribute('fill', '#FFCE67');
        currentPlayer = "x"
        $currentTimeIndicator.children[0].textContent = "PLAYER 2’S TURN"
        $currentTimeIndicator.classList.remove('red-turn')
        $currentTimeIndicator.classList.add('yellow-turn')
    }
    
    
    turnTimer = 15
}


function restartGame(all){
    board = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ]
    $winnerAlert.classList.add('hidden')
    previousStarter = previousStarter === "o" ? "x" : "o";
    currentPlayer = previousStarter;
    $game.style.pointerEvents = "initial";
    $winnerIndicator.style.backgroundColor = "#5C2DD5";
    turnTimer = 15
    timeControler()
    $gamecells.forEach((gameCell) =>{
        gameCell.className = "board-cell"
    })
    
    if(all === true){
        player1Score = 0
        $gameBoardYellow.textContent  = player1Score 
        player2Score = 0
        $gameBoardRed.textContent  = player2Score 
    }
}


function timeControler(){
    timerInterval = setInterval(() => {
        turnTimer--;
        
        $currentTimeIndicatorP.textContent = `${turnTimer}s`;
        if(turnTimer === 0){
            updateGame(0, 0, true);
        }
    }, 1000);
}



$startGameBtn.addEventListener('click', () =>{
    $menu.classList.add('hidden')
    $game.classList.remove('hidden')
    $winnerIndicator.classList.remove('hidden')
    timeControler()
})

$rulesBtn.addEventListener('click', () =>{
    $gameRulesScreen.classList.toggle('hidden')
})

$gameRulesScreenBtn.addEventListener('click', () =>{
    $gameRulesScreen.classList.toggle('hidden')
})

document.querySelector('.nav-restart-btn').addEventListener('click', () =>{
    restartGame()
})

$gamePauseMenuBtn.addEventListener('click', ()=>{
    $gamePauseMenu.classList.toggle('hidden')
})

document.querySelector('.game-menu-continue-btn').addEventListener('click', () =>{
    $gamePauseMenu.classList.toggle('hidden')

})

document.querySelector('.game-menu-restart-btn').addEventListener('click', () =>{
    restartGame(true)
})

document.querySelector('.game-menu-quit-btn').addEventListener('click', () =>{
    location.reload()
})
