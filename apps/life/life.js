let div = document.createElement("div");
let boardX = 30;
let boardY = 20;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    boardY = 30;
    boardX = 20;
}

let clientX = window.innerWidth;
let clientY = window.innerHeight;


let blockSize = 30;

div.addEventListener('resize', function(event) {
    setBlockSize();
    for (let i = 0; i < boardY; i++) {
        for (let j = 0; j < boardX; j++) {
            checkboxArray[i][j].style.width = blockSize + "px";
            checkboxArray[i][j].style.height = blockSize + "px";
        }
    }
    console.log(window.innerWidth);
});


let boardArray = Array.from(Array(boardY), () => new Array(boardX));

function randomizeBoard() {
    for (let i = 0; i < boardY; i++) {
        for (let j = 0; j < boardX; j++) {
            let rng = Math.random() * 3;
            if (rng < 1) {
                boardArray[i][j] = 1;
            } else {
                boardArray[i][j] = 0;
            }
        }
    }
}

let checkboxArray = Array.from(Array(boardY), () => new Array(boardX));

function makeCheckArray() {
    let checkboxDiv = document.createElement("div");
    checkboxDiv.className = "gol__board";
    div.appendChild(checkboxDiv);
    for (let i = 0; i < boardY; i++) {
        let tempDiv = document.createElement("div");
        tempDiv.className = "gol__board__row";
        tempDiv.id = "Row " + i;
        for (let j = 0; j < boardX; j++) {
            let tempBox = document.createElement("input");
            tempBox.type = "checkbox";
            tempBox.id = i + "," + j;
            tempBox.checked = boardArray[i][j];
            if (tempBox.checked) {
                tempBox.className = "gol__board__box--checked";
            } else {
                tempBox.className = "gol__board__box--unchecked";
            }
            tempBox.style.width = blockSize + "px";
            tempBox.style.height = blockSize + "px";
            tempBox.addEventListener("change", () => {
                let id = String(tempBox.id).split(',');
                let x = id[0];
                let y = id[1];
                boardArray[x][y] = tempBox.checked;
                if (tempBox.checked) {
                    tempBox.className = "gol__board__box--checked";
                } else {
                    tempBox.className = "gol__board__box--unchecked";
                }
                //console.log(tempBox.checked);
            })
            checkboxArray[i][j] = tempBox;
            tempDiv.appendChild(tempBox);
        }
        checkboxDiv.appendChild(tempDiv);
    }
}

function makeButtons() {
    let buttonDiv = document.createElement("div");
    buttonDiv.className = "gol__button-div";
    div.appendChild(buttonDiv);
    let advance = document.createElement("button");
    advance.innerHTML = "Next Generation";

    buttonDiv.appendChild(advance);
    advance.addEventListener("mouseup", event => {
        runGen();
    });

    let cls = document.createElement("button");
    cls.innerHTML = "Clear Screen";

    buttonDiv.appendChild(cls);
    cls.addEventListener("mouseup", event => {
        clearScreen();
    });
}



function setBlockSize() {
    clientX = div.style.width;
    clientY = div.style.height;
    clientX = clientX.substring(0, clientX.length - 2);
    clientY = clientY.substring(0, clientY.length - 2);
    if (clientX * 20 > clientY * 30) {
        blockSize = clientY / 22;
    } else {
        blockSize = clientX / 32;
    }
    //console.log(clientX > clientY * 1.33);
}


function runGen() {
    let tempArray = Array.from(Array(boardY), () => new Array(boardX));
    for (let i = 0; i < boardY; i++) {
        for (let j = 0; j < boardX; j++) {
            let squaresAround = 0;
            if (i - 1 >= 0) {
                if (j - 1 >= 0) {
                    if (boardArray[i - 1][j - 1] == 1) squaresAround++;
                }
                if (boardArray[i - 1][j] == 1) squaresAround++;
                if (j + 1 < boardX) {
                    if (boardArray[i - 1][j + 1] == 1) squaresAround++;
                }
            }
            if (j - 1 >= 0) {
                if (boardArray[i][j - 1] == 1) squaresAround++;
            }
            if (j + 1 < boardX) {
                if (boardArray[i][j + 1] == 1) squaresAround++;
            }
            if (i + 1 < boardY) {
                if (j - 1 >= 0) {
                    if (boardArray[i + 1][j - 1] == 1) squaresAround++;
                }
                if (boardArray[i + 1][j] == 1) squaresAround++;
                if (j + 1 < boardX) {
                    if (boardArray[i + 1][j + 1] == 1) squaresAround++;
                }
            }
            //console.log(squaresAround);
            tempArray[i][j] = squaresAround;
        }
    }
    for (let i = 0; i < boardY; i++) {
        //console.log(tempArray[i]);
        for (let j = 0; j < boardX; j++) {

            let square = tempArray[i][j];
            if (square > 3 || square < 2) {
                boardArray[i][j] = 0;
            } else if (boardArray[i][j] == 1) {
                boardArray[i][j] = 1;
            } else if (boardArray[i][j] == 0 && square == 3) {
                boardArray[i][j] = 1;
            }
        }
    }
    changeBoxes();
}

function changeBoxes() {
    for (let i = 0; i < boardY; i++) {
        for (let j = 0; j < boardX; j++) {
            //console.log(boardArray[i][j]);
            let currentBox = checkboxArray[i][j];
            currentBox.checked = boardArray[i][j];
            if (currentBox.checked) {
                currentBox.className = "gol__board__box--checked";
            } else {
                currentBox.className = "gol__board__box--unchecked";
            }
        }
    }
}

function clearScreen() {
    for (let i = 0; i < boardY; i++) {
        for (let j = 0; j < boardX; j++) {
            boardArray[i][j] = 0;
            changeBoxes();
        }
    }
}

function playGameOfLife(tempdiv) {
    div = tempdiv;
    clientX = div.style.width;
    clientY = div.style.height;

    div.addEventListener('resize', function(event) {
        setBlockSize();
        for (let i = 0; i < boardY; i++) {
            for (let j = 0; j < boardX; j++) {
                checkboxArray[i][j].style.width = blockSize + "px";
                checkboxArray[i][j].style.height = blockSize + "px";
            }
        }
        //console.log(window.innerWidth);
    });

    setBlockSize();
    randomizeBoard();
    makeCheckArray();
    makeButtons();
}

function gameOfLife() {
    let height = 455;
    let width = 600;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        height = 630;
        width = 400;
    }
    let lifeWindow = makeWindow(10, 30, height, width, "Game Of Life");
    let tempDiv = document.createElement("div");
    tempDiv.className = "gol";
    tempDiv.style.height = height - 22 + "px";
    tempDiv.style.width = width + "px";
    lifeWindow.appendChild(tempDiv);
    playGameOfLife(tempDiv);
}