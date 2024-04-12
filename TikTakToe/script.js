
const cells=document.querySelectorAll(".cell");
const turn = document.querySelector("#turn");
const resbutton = document.querySelector("#restart");

const wincondition = [

  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options =["","","","","","","","",""];
let player ="X";

let running = false;

initializeGame();

function initializeGame(){
  cells.forEach(cell => cell.addEventListener("click", cellcheck));
  resbutton.addEventListener("click", restart);
  turn.textContent = `it is ${player} turn`;
  running = true;
};

function cellcheck(){

  const cellindex = this.getAttribute("cellIndex");
  if(options[cellindex] != "" || !running){
    return;
  }
  updatecell(this,cellindex);
  checkwin();
  

};

function updatecell(cell, index){
  options[index]= player;
  cell.textContent= player;
  if (player === 'X') {
    cell.classList.add('green');
  } else {
    cell.classList.add('blue');
  }
};

function ChangePlayer(){
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
  turn.textContent = `${player}'s turn`;
  
};

function checkwin(){
  let roundwon = false;

  for(let i =0; i<wincondition.length; i++){
    let condiotion =wincondition[i];
    let varA= options[condiotion[0]];
    let varB= options[condiotion[1]];
    let varC= options[condiotion[2]];

    if(varA == "" || varB == "" || varC == ""){
      continue;
    }
    if(varA == varB && varB == varC){
      roundwon= true;
      break;
    }
  }

  if(roundwon){
    turn.textContent= `${player} won the match`;
    running =false;
  }
  else if(!options.includes("")){
    turn.textContent= `Draw`;
    running=false;
  }
  else{
    ChangePlayer();
  }

};

function restart(){
  player = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  turn.textContent = `It is ${player}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('blue'); 
    cell.classList.remove('green'); 
  });
}