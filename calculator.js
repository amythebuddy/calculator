const numBtns = document.querySelectorAll(".showNumber");
const calcBtns = document.querySelectorAll('.operation')
const clear = document.getElementById('clear');
let output = document.getElementById('outputBox');
let isFirst = true; // for the first input number
let isFirst2 = true; //for the second input number
let isClicked = true; // for the operation 
let firstNumber = 0;
let secondNumber = 0;

function showNum(event){
    let clickedBtn = event.target;
    
    //if the first number input, it removes the default 0
    //else keeping adding on to the output
    if(isFirst) output.innerText = clickedBtn.innerText;
    else output.innerText += clickedBtn.innerText;
    firstNumber = parseFloat(output);
    isFirst = false;

    calcBtns.forEach((calc) => {
        calc.onclick = function(){
            output.innerText = 0;
        }
    }); 

    if(isClicked){
        if(isFirst2) output.innerText = clickedBtn.innerText;
        else output.innerText += clickedBtn.innerText;
        secondNumber = parseFloat(output);
        isFirst2 = false;
    }

    // if(clickedBtn.innerText === '+') firstNumber += secondNumber;
    // else if(clickedBtn.innerText === '-') firstNumber -= secondNumber;
    // else if(clickedBtn.innerText === '/') firstNumber /= secondNumber;
    // else if(clickedBtn.innerText === '*') firstNumber *= secondNumber;
    // isClicked = false;

}



numBtns.forEach((button => {
    button.addEventListener('click', showNum);
}));


clear.addEventListener('click', () => {
    output.innerText = 0;
    firstNumber = 0;
    secondNumber = 0;
});