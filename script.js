document.addEventListener("DOMContentLoaded",()=>{
    const boxes = document.querySelectorAll('.box');
    const resetBtn = document.querySelector(".reset-btn");
    const newBtn = document.querySelector(".new_btn");
    const msgContainer = document.querySelector(".msg_container");

    let turn0 = true;

    const resetGame = () => {
        enableBoxes();
        msgContainer.classList.add("hide");
    }

    // start game 
    const winPatters = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ];


    const disableBoxes = () => {
        for (let box of boxes) {
            box.disabled = true;
        }
    }
    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    }
    const showWinner = (winner) => {
        msgContainer.textContent = `Congratulations, winner is 👏👏 ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    }

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            if (turn0) {
                box.textContent = "O";
                turn0 = false;
            } else {
                box.textContent = "X";
                turn0 = true;
            }
            box.disabled = true;
            checkWinner();
        });
    });

    // check Winner 
    const checkWinner = () => {
        let winnerFound = false;
        let winSound = new Audio('./sounds/winSound.mp3');

        for (let pattern of winPatters) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
                if (pos1Val === pos2Val && pos2Val === pos3Val) {
                    console.log("Winner" + pos1Val);
                    winnerFound = true;
                    winSound.play();
                    showWinner(pos1Val);
                    break;
                }
            }
        }
        if(!winnerFound){
            drawMatch();
        }
    }

    const drawMatch = () => {
        let filledBoxesCount = 0;
        for(let box of boxes){
            if(box.innerText  !== ""){
                filledBoxesCount++;
            }
        }
        if(filledBoxesCount === 9){
            msgContainer.textContent = "Match Draw";
            msgContainer.classList.remove('hide');
            disableBoxes();
        }
    }

    boxes.forEach((box) => {
        let firstAudio = new Audio('./sounds/first.mp3');
        let secondAudio = new Audio('./sounds/second.mp3');

        box.addEventListener("click", (e) => {
            let clickButton = e.target.innerText;
            if (clickButton === "O") {
                box.style.color = "Red";
                firstAudio.play();
            } else {
                box.style.color = "Blue";
                secondAudio.play();
            }
        });
    });
    
    resetBtn.addEventListener("click", resetGame);
    newBtn.addEventListener("click", resetGame);

});