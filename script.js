// players to be stored in objects
const Player = function(name, sign) {
    const playerInfo = {name: name, sign: sign};
    return playerInfo;
 };

// store gameboard as array inside Gameboard object
const gameBoard = (function() {
    const boardCells = document.querySelectorAll(".cell");
    const gameGrid = document.querySelector(".game-grid");
    let boardArray = ["", "", "",
                     "", "", "",
                     "", "", "",];

    const playerOne = Player("playerOne", "X");
    const playerTwo = Player("playerTwo", "O");
    let currentPlayer = playerOne;

    const winnerSpan = document.querySelector(".round-winner");
    const playerOneSpan = document.querySelector(".player-one");
    const playerTwoSpan = document.querySelector(".player-two");
    let playerOneScore = 0;
    let playerTwoScore = 0;

    const restartButton = document.querySelector(".restart-btn");
    
    // Listen for user click
    boardCells.forEach(cell => cell.addEventListener("click", storeSelection));
    restartButton.addEventListener("click", clearBoard);

    function storeSelection(event) {
        // Get index of clicked cell, need to add X/O to boardArray, then render() 
        let index = Array.from(event.target.parentElement.children).indexOf(event.target);
        if (isCellAlreadyClicked(index)) {
            console.log(index); // FOR DEBUGGING - TO BE REMOVED
            console.log(boardArray) // FOR DEBUGGING - TO BE REMOVED
            boardArray[index] = currentPlayer.sign; // Replace "X" with current player (O or X)
            _render();
            let isWinner = checkForWin(index);
            addScore(isWinner);
            console.log(isWinner); // FOR DEBUGGING - TO BE REMOVED
            changeTurn(currentPlayer); // change currentPlayer to other player
            console.log(boardArray) // FOR DEBUGGING - TO BE REMOVED
        } else {
            return;
        };
    };

    function _render() {
        // render boardArray data to DOM
        for (let i = 0; i < boardArray.length; i++) {
            gameGrid.children[i].textContent = boardArray[i];
        };
    };

    function changeTurn(player) {
        if (player.sign === "X") {
            return currentPlayer = playerTwo;
        }
        else if (player.sign === "O") {
            return currentPlayer = playerOne;
        };
    };

    function isCellAlreadyClicked(cellIndex) {
        if (boardArray[cellIndex] === "") {
            return true;
        } else {
            return false;
        };
    };

    function clearBoard() {
        boardArray = ["", "", "",
                     "", "", "",
                     "", "", "",];
        _render();
    };

    function checkForWin() {
        const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                         [0, 3, 6], [1, 4, 7], [2, 5, 8],
                         [0, 4, 8], [2, 4, 6]];
        
        function winFactory(aSign) {
            return winConditions.some((winCondition) => {
                return winCondition.every((threeMarks) => {
                    return boardArray[threeMarks] === aSign;
                });
            });
        };
        const didXWin = winFactory("X");
        const didOWin = winFactory("O");

        if (didXWin === true) {
            return "x";
        } else if (didOWin === true) {
            return "o";
        } else {
            return false;
        }
    };

    function addScore(player) {
        if (player === false) {
            return;
        } else if (player === "x") {
            playerOneScore += 1;
            playerOneSpan.textContent = playerOneScore;
            winnerSpan.textContent = "Player One Wins!";

        } else if (player === "o") {
            playerTwoScore += 1;
            playerTwoSpan.textContent = playerTwoScore;
            winnerSpan.textContent = "Player Two Wins!";
        }
    };

    return {storeSelection, changeTurn, clearBoard};
})();

