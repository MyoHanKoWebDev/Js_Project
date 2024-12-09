const user = document.getElementById("user");
const com = document.getElementById("com");
const res = document.getElementById("res");
const items = document.querySelectorAll(".item");
let player;
let computer;
let result;

items.forEach(button => button.addEventListener('click', () => {
        player = button.textContent;
        computerItem();
        user.textContent = `User Turn : ${player}`;
        com.textContent = `Computer Turn : ${computer}`;
        res.textContent = checkWinner();
    })
)

function computerItem() {
    let ram = Math.floor(Math.random() * 3);

    switch (ram) {
        case 0:
            computer = "Rock";
            break;
        case 1:
            computer = "Paper";
            break;
        case 2:
            computer = "Scissor";
            break;
        default :
            break;
    }
}

function checkWinner(){
    if(player == computer)
        return "Draw!";
    else if(computer == "Rock")
        return (player == "Paper") ? "You Win" : "You Lose";
    else if(computer == "Paper")
        return (player == "Scissor") ? "You Win" : "You Lose";
    else if(computer == "Scissor")
        return (player == "Rock") ? "You Win" : "You Lose";
}