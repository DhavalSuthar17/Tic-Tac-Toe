const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

//intial varaible
let currentPlayer;
let gameGrid;

//defining the winning position

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//creating a game initailiazing function 

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","","",];

    //adding logic to make change on the screen
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();



//creating the player swap function 
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";

    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


//creating the check game function to check for the game over 
function checkGameOver(){
    let winner = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non empty and exactly same in value 

        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])){
    
        //check for the winner 
        if(gameGrid[position[0]] === "X")
         winner = "X";
        else
        winner = "O";
    //disable pointer events 
    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
    });

    // now we know the winner 
    boxes[position[0]].classList.add("win");
    boxes[position[1]].classList.add("win");
    boxes[position[2]].classList.add("win");
    
    
    
    
}
    });

    //it means we have a winner 
    if (winner !== "" ){
        
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    //let's check wether there is the tie 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;

    });


    //board is filled ,game is tie 
    if (fillCount === 9 ){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


//creating a function that handls the clicks
function handleClick(index) {
    // checking if box is empty or not 
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";
        //swap the player turn 
        swapTurn();
        //check for the game over 
        checkGameOver();
    }
}



boxes.forEach((box, index) => {
box.addEventListener("click", () => {
    handleClick(index);
});
});

//adding a event listerner to the new game button 
newGameBtn.addEventListener("click", initGame);