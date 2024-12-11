const board = document.getElementById("board");
const canvas = board.getContext("2d");
const scoretext = document.getElementById("score");
const rebtn = document.getElementById("rebtn");
const gWidth = board.width;
const gHeight = board.height;
const boardBg = "white";
const snakeColor = "lightBlue";
const snakeBorder = "black";
const foodColor = "red";
const uniteS = 25;
let lsp = true;
let spd = 75;
let running = false;
let xVelo = uniteS;
let yVelo = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: uniteS * 4, y: 0 },
    { x: uniteS * 3, y: 0 },
    { x: uniteS * 2, y: 0 },
    { x: uniteS, y: 0 },
    { x: 0, y: 0 },
]

window.addEventListener("keydown", chgDir);
rebtn.addEventListener("click", reStart);

gameStart();

function gameStart() {
    running = true;
    scoretext.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, snake.length == 5 ? spd : speed());
        console.log(spd)
        function speed(){
            
            if((snake.length) % 5 == 0 && lsp ){
                if(spd == 40){
                    spd = spd;
                }else{
                    spd -= 5;
                    lsp = false;
                }
            }else if((snake.length) % 5 != 0){
                spd = spd;
                lsp = true;
            }
            return spd;    
        }
    } else {
        disGO();
    }
}

function clearBoard() {
    canvas.fillStyle = boardBg;
    canvas.fillRect(0, 0, gWidth, gHeight);
}

function createFood() {
    function ramFood(min, max) {
        let ramdom = Math.floor((Math.random() * (max - min) + min) / uniteS) * uniteS;
        return ramdom;
    }
    foodX = ramFood(0, gWidth - uniteS);
    console.log(foodX);
    foodY = ramFood(0, gHeight - uniteS);
}

function drawFood() {
    canvas.fillStyle = foodColor;
    canvas.fillRect(foodX, foodY, uniteS, uniteS);
}

function drawSnake() {
    canvas.fillStyle = snakeColor;
    canvas.strokeStyle = snakeBorder;
    snake.forEach(part => {
        canvas.fillRect(part.x, part.y, uniteS, uniteS);
        canvas.strokeRect(part.x, part.y, uniteS, uniteS);
    })

}

function moveSnake() {
    const head = { x: snake[0].x + xVelo, y: snake[0].y + yVelo };

    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoretext.textContent = score;
        createFood();
    } else {
        snake.pop(head);
    }
}

function chgDir(event) {
    const keyPress = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelo == -uniteS);
    const goingDown = (yVelo == uniteS);
    const goingRight = (xVelo == uniteS);
    const goingLeft = (xVelo == -uniteS);

    switch (true) {
        case (keyPress == LEFT && !goingRight):
            xVelo = -uniteS;
            yVelo = 0;
            break;
        case (keyPress == UP && !goingDown):
            xVelo = 0;
            yVelo = -uniteS;
            break;
        case (keyPress == RIGHT && !goingLeft):
            xVelo = uniteS;
            yVelo = 0;
            break;
        case (keyPress == DOWN && !goingUp):
            xVelo = 0;
            yVelo = uniteS;
            break;
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gHeight):
            running = false;
            break;
    }

    for(let i=1 ; i<snake.length ; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
}

function disGO() {
    canvas.font = "50px MV Boli";
    canvas.fillStyle= "black";
    canvas.textAlign= "center";
    canvas.fillText("Game Over", gWidth/2,gHeight/2);
    running = false;
}

function reStart() {
    score = 0;
    xVelo = uniteS;
    yVelo = 0;
    lsp = true
    spd = 75;
    snake = [
        { x: uniteS * 4, y: 0 },
        { x: uniteS * 3, y: 0 },
        { x: uniteS * 2, y: 0 },
        { x: uniteS, y: 0 },
        { x: 0, y: 0 },
    ]
    gameStart();    
}