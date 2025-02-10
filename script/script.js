const $gamecells = document.querySelectorAll('.board-cell');

let board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
];

let currentPlayer = "x";

console.log(board);
$gamecells.forEach((gameCell) => {
    gameCell.addEventListener('click', function () {
        let cellX = parseInt(gameCell.getAttribute('data-x'));
        let cellY = parseInt(gameCell.getAttribute('data-y'));

        for (let i = board.length - 1; i >= 0; i--) {
            if (board[i][cellY] === "") {
                cellX = i;
                break;
            }
        }
        if (board[cellX][cellY] === "") {
            updateGame(cellX, cellY);
        } else {
            alert("c'est plein");
        }
    });
});

function updateGame(x, y) {
    board[x][y] = currentPlayer;

    if (currentPlayer === "x") {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('yellow-circle');
    } else {
        document.querySelector(`[data-x="${x}"][data-y="${y}"]`).classList.add('red-circle');
    }

    currentPlayer = (currentPlayer === "x") ? "y" : "x";
    console.log(board);
}

