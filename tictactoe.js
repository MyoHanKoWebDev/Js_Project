const cells = document.querySelectorAll(".cells");
const stText = document.getElementById("stText");
const reBtn = document.getElementById("rebtn");
const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [5, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let curPlayer = "X";
let running = false;

initGame();

function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClick));
    reBtn.addEventListener('click', reStart);
    stText.textContent = `${curPlayer} Turn`;
    running = true;
}

function cellClick() {
    const cellClick = this.getAttribute("cellIndex");

    if (options[cellClick] != "" || !running) {
        return;
    }
    updateCell(this, cellClick);
    checkWin();
}

function updateCell(cell1, index) {
    options[index] = curPlayer;
    cell1.textContent = curPlayer;
}

function changePlayer() {
    curPlayer = (curPlayer == "X") ? "O" : "X";
    stText.textContent = `${curPlayer} Turn`;
}

function checkWin() {
    let round = false;
    for (let i = 0; i < winCon.length; i++) {
        const res = winCon[i];
        const cellA = options[res[0]];
        const cellB = options[res[1]];
        const cellC = options[res[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            round = true;
            break;
        }
    }
    if (round) {
        stText.textContent = `${curPlayer} Win`;
        running = false;
    } else if (!options.includes("")) {
        stText.textContent = "Draw!";
        running = false;
    } else {
        changePlayer();
    }
}

function reStart() {
    curPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    stText.textContent = `${curPlayer} turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}