const hexCode = document.querySelector("#hexContainer");
const color = generateRandomColor();
const label = document.querySelector("#label");
let guesses = 0;

hexCode.innerHTML = "#" + color;

//Creating difficulty settings buttons, and adding listeners to them
let diff = 2;
createOptions(diff);
var difficulties = document.querySelectorAll('#difficulty button');
difficulties.forEach(button => {
    console.log(button.textContent);
    button.addEventListener('click',event =>{changeDiff(button)});
    
});

function changeDiff(link){
    
    diff = parseInt(link.textContent);
    
    createOptions(diff);
}

function createOptions(n){
    guesses = 0;
    label.innerHTML = "Guess the color";
    let options = document.querySelectorAll('.option');
    options.forEach(option =>{option.remove()});

    
    for(let i=0;i<n;i++){
        randomColor = generateRandomColor();
        if(i==0){
            randomColor = color;
        }

        var div = document.createElement('div');
        div.className = "option"
        button = document.createElement('button');
        button.type = 'button';
        
       


        
        div.appendChild(button);
        document.querySelector("#options").appendChild(div);
    }

    let buttons = document.querySelectorAll('.option button');
    let i = 0;
    let random = Math.round(Math.random() * (buttons.length-1));
    
    buttons.forEach(button =>{
        let randomColor = generateRandomColor();
        if(i == random){
            randomColor = color;
            console.log("Assigned main color");
        }
        button.textContent = "#"+randomColor;
        button.style.backgroundColor = "#"+randomColor;
        button.style.color = "#"+randomColor;

        button.addEventListener('click',event =>{
            checkGuess(button)
        })
        i++;
    })
    console.log("Options created");
}

function checkGuess(button){
    if(button.textContent == ("#"+color)){
        label.innerHTML = "You got it!!";
        var restartButton = document.createElement('button');
        restartButton.id = "restart";
        restartButton.textContent = "Restart the game";
        restartButton.addEventListener('click',function(){
            window.location.reload();
        });
        label.append(restartButton);
        return;
    }

    guesses++;
    label.innerHTML ="Missed it! Try again, the last color was:<p></p>. Guesses:"+guesses;
    let p = document.querySelector("#label p");
    p.innerHTML = button.textContent;
    p.style.color = button.textContent;
    button.parentElement.remove();

}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return randColor.toUpperCase()
}