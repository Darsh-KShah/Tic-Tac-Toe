let boxes = document.querySelectorAll(".box");
let player1 = document.querySelector("#p1");
let player2 = document.querySelector("#p2");
let winMsg = document.querySelector(".winMsg");
let newgameBtn = document.querySelector(".newgame-button");
let resetBtn = document.querySelector("#reset-button");
let pTurn = 1;
let gameOver = false;
let isDraw = true; 

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function displayWinMsg(winner) {
    winner === 'X' ? winMsg.textContent = 'Congratulations Player 1 Game Over! ' : winMsg.textContent = 'Congratulations Player 2 Game Over!';
    winMsg.style.display = "block";
    newgameBtn.style.display = "block";
}

function displayDrawMsg() {
    winMsg.textContent = "It's a Draw! Game Over";
    winMsg.style.display = "block";
    newgameBtn.style.display = "block";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;
        if (pTurn === 1) {
            box.innerText = 'X';
            box.style.border = "none";
            box.style.opacity = "0.8";
            box.style.backgroundColor = "black";
            pTurn = 2;
            player2.classList.add("p");
            player1.classList.remove("p");
        } else {
            box.innerText = 'O';
            box.style.border = "none";
            box.style.opacity = "0.8";
            box.style.backgroundColor = "black";
            pTurn = 1;
            player1.classList.add("p");
            player2.classList.remove("p");
        }   
        box.disabled = true;
        for (let vl of winPatterns) {
            let [a, b, c] = vl;
            if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
                // boxes[a].classList.add("winPat");
                boxes[a].style.backgroundColor = "red";
                boxes[b].style.backgroundColor = "red";
                boxes[c].style.backgroundColor = "red";    
                boxes[a].style.opacity = "1";
                boxes[b].style.opacity = "1";
                boxes[c].style.opacity = "1";
                resetBtn.style.opacity = "0.5";             
                displayWinMsg(boxes[a].innerText);          
                gameOver = true;                
                break;
            }
        }    
        isDraw = true;      
        boxes.forEach(box => {
            if(box.innerText === '') {
                isDraw = false;
            }
        });
        if(isDraw && !gameOver) {
            displayDrawMsg();
            resetBtn.style.opacity = "0.5"; 
            gameOver = true;
        }
    });
});

function reset() {
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.border = "0.5vh solid #caf0f8";
        box.style.opacity = "0.8";
        box.style.backgroundColor = "";
        box.disabled = false;
        box.classList.remove("winPat");
    });
    player1.classList.add("p");
    player2.classList.remove("p");
    winMsg.style.display = "none";
    newgameBtn.style.display = "none";
    resetBtn.style.opacity = "1";
    gameOver = false;
    pTurn = 1;
}

newgameBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);