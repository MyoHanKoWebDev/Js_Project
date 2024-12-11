const board = document.getElementById("board");
const canvas = board.getContext("2d");
const scoretext = document.getElementById("score");
const rebtn = document.getElementById("rebtn");
const gWidth = board.width;
const gHeight = board.height;
const bBg = "black";
const paddle1Co = "blue";
const paddle2Co = "green";
const paddleBo = "white";
const ballCo = "white";
const ballBo = "gray";
const ballRadius = 12.5;
const paddleSpeed = 50;
let interId;
let ballSp = 1;
let ballX = gWidth / 2;
let ballY = gHeight / 2;
let ballXDir = 0;
let ballYDir = 0;
let player1Sc = 0;
let player2Sc = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gWidth - 25,
    y: gHeight - 100
};

window.addEventListener("keydown", chgDir);
rebtn.addEventListener('click', reStart);
gameStart();

function gameStart() {
    createBall();
    nextTick();
}

function nextTick() {
    interId = setTimeout(() => {
        clearBoard();
        drawPaddle();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10);
}

function clearBoard() {
    canvas.fillStyle = bBg;
    canvas.fillRect(0, 0, gWidth, gHeight);
}

function drawPaddle() {
    canvas.strokeStyle = paddleBo;

    canvas.fillStyle = paddle1Co;
    canvas.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    canvas.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    canvas.fillStyle = paddle2Co;
    canvas.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    canvas.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall() {
    ballSp = 1;
    if (Math.round(Math.random()) == 1) {
        ballXDir = 1;
    } else {
        ballXDir = -1;
    }
    if (Math.round(Math.random()) == 1) {
        ballYDir = 1;
    } else {
        ballYDir = -1;
    }

    ballX = gWidth / 2;
    ballY = gHeight / 2;
    drawBall(ballX, ballY);
}

function moveBall() {
    ballX += (ballSp * ballXDir);
    ballY += (ballSp * ballYDir);
}

function drawBall(ballX, ballY) {
    canvas.fillStyle = ballCo;
    canvas.strokeStyle = ballBo;
    canvas.lineWidth = 2;
    canvas.beginPath();
    canvas.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    canvas.fill();
    canvas.stroke();
}

function checkCollision() {
    if (ballY <= 0 + ballRadius) {
        ballYDir *= -1;
    }
    if (ballY >= gHeight - ballRadius) {
        ballYDir *= -1;
    }
    if (ballX <= 0) {
        player2Sc += 1;
        updateSc();
        createBall();
        return;
    }
    if (ballX >= gWidth) {
        player1Sc += 1;
        updateSc();
        createBall();
        return;
    }
    if (ballX <= paddle1.x + paddle1.width + ballRadius) {
        if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
            ballX = (paddle1.x + paddle1.width) + ballRadius; //if ball get stuck
            ballXDir *= -1;
            ballSp += 1;
        }
    }
    if (ballX >= paddle2.x - ballRadius) {
        if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
            ballX = paddle2.x - ballRadius;
            ballXDir *= -1;
            ballSp += 1;
        }
    }

}

function chgDir(event) {
    const keyPress = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch (keyPress) {
        case (paddle1Up):
            if (paddle1.y > 0) {
                paddle1.y -= paddleSpeed;
            }
            break;
        case (paddle1Down):
            if (paddle1.y < gHeight - paddle1.height) {
                paddle1.y += paddleSpeed;
            }
            break;
        case (paddle2Up):
            if (paddle2.y > 0) {
                paddle2.y -= paddleSpeed;
            }
            break;
        case (paddle2Down):
            if (paddle2.y < gHeight - paddle2.height) {
                paddle2.y += paddleSpeed;
            }
            break;

    }
}

function updateSc() {
    scoretext.textContent = `${player1Sc} : ${player2Sc}`;
}

function reStart(){
    player1Sc = 0;
    player2Sc = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gWidth - 25,
        y: gHeight - 100
    };
    ballSp = 1;
    ballX = 0;
    ballY = 0;
    ballXDir = 0;
    ballYDir = 0;
    updateSc();
    clearTimeout(interId);
    gameStart();
}