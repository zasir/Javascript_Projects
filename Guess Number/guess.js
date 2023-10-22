let randomNum=parseInt(Math.random()*100+1)

const resultParas = document.querySelector(".resultParas")
const guessField = document.querySelector("#guessField")
const subt = document.querySelector(".guessSubmit")
const guesses = document.querySelector(".guesses")
const lastResult = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")


let numberOfGuess=2
let playGame=true
let previousGuess=[]
if(playGame){
    subt.addEventListener('click',(e)=>{
        e.preventDefault()
       const input= parseInt(guessField.value)
      valiidate(input)
    })
}


function valiidate(input){
    if(isNaN(input)){
        alert("Please Enter Valid Number")
    }else if(input<1){
        alert("Please Enter a number greater than 1")
    }else if(input>100){
        alert("Please Enter a number less than 100")
    }else{
        
        if(numberOfGuess===0){
            
            displayMessage(`Game Over!! Random Number was ${randomNum}`)
            endGame()
            
        }else{
            previousGuess.push(input)
            updateFields(input)

            check(input)
        }
    }

}
function check(input){
    if(input===randomNum){
        displayMessage("You Guessed correct number")
    }else if(input>randomNum){
        displayMessage("Guessed Number is greater than the correct Number")
    }
    else{
        displayMessage("Guessed Number is less than the correct Number")

    }
}
function updateFields(){
    guessField.value=""
    guesses.innerHTML=previousGuess
    lastResult.innerHTML= --numberOfGuess
    
}

function displayMessage(message){
    lowOrHi.innerHTML=`<h2>${message}</h2>`
}
function endGame(){
    guessField.value=""
    guessField.setAttribute("disabled","")
    const p=document.createElement('p')
    p.classList.add('btn');
    p.innerHTML="Start new Game"
    resultParas.appendChild(p)
    playGame = false;
    newGame();
    
    
}
function newGame(){
    const newGameButton = document.querySelector('.btn');
    newGameButton.addEventListener('click', function (e) {
      randomNum = parseInt(Math.random() * 100 + 1);
      previousGuess = []    
      guesses.innerHTML=previousGuess
      lastResult.innerHTML=2
      numberOfGuess=2
      displayMessage("")
      guessField.removeAttribute('disabled');
      resultParas.removeChild(newGameButton)
      
  
      playGame = true;
    });
}