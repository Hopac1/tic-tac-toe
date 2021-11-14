// players to be stored in objects
const Player = function(name, sign) {
    const playerInfo = {name: name, sign: sign};
    return playerInfo;
 }

// object to control the flow of the game itself
const displayController = function() {
    console.log("blank");
}

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
    
    // Listen for user click
    boardCells.forEach(cell => cell.addEventListener("click", storeSelection));

    function storeSelection(event) {
        // Get index of clicked cell, need to add X/O to boardArray, then render() 
        let index = Array.from(event.target.parentElement.children).indexOf(event.target);
        if (isCellAlreadyClicked(index)) {
            console.log(index); // FOR DEBUGGING - TO BE REMOVED
            console.log(boardArray) // FOR DEBUGGING - TO BE REMOVED
            boardArray[index] = currentPlayer.sign; // Replace "X" with current player (O or X)
            changeTurn(currentPlayer)// change currentPlayer to other player
            console.log(boardArray) // FOR DEBUGGING - TO BE REMOVED
            _render();
        } else {
            return;
        }
    }

    function _render() {
        // render boardArray data to DOM
        for (let i = 0; i < boardArray.length; i++) {
            gameGrid.children[i].textContent = boardArray[i];
        }
    }

    function changeTurn(player) {
        if (player.sign === "X") {
            return currentPlayer = playerTwo;
        } 
        else if (player.sign === "O") {
            return currentPlayer = playerOne;
        }
    }

    function isCellAlreadyClicked(cellIndex) {
        if (boardArray[cellIndex] === "") {
            return true;
        } else {
            return false;
        }
    }

    function clearBoard() {
        boardArray = ["", "", "",
                     "", "", "",
                     "", "", "",];
        _render()
    }
    return {storeSelection, changeTurn, clearBoard}
})();

