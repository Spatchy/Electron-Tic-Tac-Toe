var currentPlayer = "X";
var gameWon = false;

window.onload = function() {
    var allCells = document.getElementsByClassName("cell");
    //add event listener to every cell
    for(var cell = 0; cell < allCells.length; cell++){
        clickedCell = allCells[cell];
        player = currentPlayer;
        allCells.item(cell).addEventListener("click", function(clickedCell, player) {
            claimCell(clickedCell, currentPlayer);
        }
        )
    }
}

function checkWins(player){
    var checkFor = "is" + player; //isX or isO

    //create a list of win conditions
    var conditionsList = [
        "top",
        "middle",
        "bottom",
        "left",
        "centre",
        "right",
        "lrDia",
        "rlDia"
    ];
    
    //loop through lines and check if a cell in that line does not belong to current player
    //remove that line from the win conditions list if true
    condition = conditionsList.length - 1;
    while(condition >= 0){
        var line = document.getElementsByClassName(conditionsList[condition]);
        for(var i = 0; i < line.length; i++){
            //if cell doesn't contain the class for the current player:
            if(!(line.item(i).classList.contains(checkFor))){
                conditionsList.splice(condition, 1); //remove the current item from the array
                break;
            }
        }
        condition--;
    }

    //check list again to see if it's not empty
    //if not, that means current player has won 
    if(!(conditionsList.length === 0)){
        //loop to acount for multiple win condtions
        for(var condition = 0; condition < conditionsList.length; condition++){
            var line = document.getElementsByClassName(conditionsList[condition]);
            //loop through cells in the line to mark them as part of the winning line
            for(var i = 0; i < line.length; i++){
                line.item(i).classList.add("winningSet");
            }
        }
        //update the top label
        document.getElementById("turnLabel").innerHTML = "Player " + player + " wins!";
        
        return true;
    }
    else{
        return false;
    }
}

function switchPlayer(player){
    if(player === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    //update top label
    document.getElementById("turnLabel").innerHTML = "Player " + currentPlayer + " take your turn";
}

function claimCell(elem, player){
    elem = elem.target;
    //if cell is not claimed and game is not won:
    if(elem.classList.contains("free") && !(gameWon)){
        elem.classList.add("is" + player);
        elem.classList.remove("free");
        elem.innerHTML = player;
        if(!checkWins(player)){
            switchPlayer(player);
        }
        else{
            gameWon = true;
        }
    }
}
