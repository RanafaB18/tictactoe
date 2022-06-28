let playerTurn = 1;
let gridItemID;
let winnerPresent = false;
let player_One = new Array();
let player_Two = new Array();
let alreadyTapped = new Array();

const win_combos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

const buttons = document.querySelectorAll('.grid-item');
buttons.forEach(
    (button) => {
        button.addEventListener('click', function () {
            getId(button.id);
        }, false);
    }
);


function getId(id) {
    gridItemID = id;
    var num = parseInt(gridItemID.replace(/[^0-9]/g, ''));
    if (playerTurn == 1) {
        player_One.push(num);
    }
    else if (playerTurn == 2) {
        player_Two.push(num);
    }
    alreadyTapped.push(num);
    changeTurn();
}

function changeTurn() {
    if (playerTurn == 1) {
        playerTurnUI("Player 2's Turn");
        change(2, "X.png");
        if (winningMove(win_combos, player_One)) {
            winnerPresent = true;
            blurBackground();
            buildModal("Player 1");
        } else if (alreadyTapped.length == 9 && !winnerPresent) {
            blurBackground();
            buildModal("Draw");
        }
    }
    else {
        playerTurnUI("Player 1's Turn");
        change(1, "O.png");
        if (winningMove(win_combos, player_Two)) {
            winnerPresent = true;
            blurBackground();
            buildModal("Player 2");
        }
    }
}

function change(turn, image) {
    document.getElementById(gridItemID).setAttribute("src", image);
    playerTurn = turn;
    document.getElementById(gridItemID).removeAttribute("onclick");
}

function winningMove(win_combos, picks) {
    let l = new Array;
    for (let i of win_combos) {
        l = [];
        for (let j of i) {
            l.push(picks.includes(j) ? true : false);
        }
        if (l.every((value) => value == true)) {
            return true;
        }
    }
    return false;

}

function blurBackground() {
    const blur = document.getElementById("blur");
    const button = document.getElementById("btn");
    blur.classList.toggle('active');
}

function buildModal(player) {
    const body = document.body;
    const div = document.createElement("div");
    div.classList.add('modal');


    const innerDiv = document.createElement("div");
    const header_text = document.createElement("h1");
    const wins_text = document.createElement("h1");
    const reset_button = document.createElement("div");

    header_text.innerText = player;
    wins_text.innerText = "wins";
    reset_button.innerText = "Play Again";
    reset_button.classList.add("reset-btn");
    reset_button.onclick = restart;

    div.append(innerDiv);
    innerDiv.classList.add("inner-div-style");
    if (player == "Draw") {
        wins_text.innerText = "";
        div.classList.toggle("draw");
    }
    innerDiv.append(header_text, wins_text, reset_button);
    body.appendChild(div);
}


function restart() {
    location.reload();
}


function playerTurnUI(player) {
    const playerDiv = document.getElementById("player-turn");
    playerDiv.innerText = player;
}






