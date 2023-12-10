const numBtns = document.querySelectorAll(".showNumber");
const calcBtns = document.querySelectorAll('.operation')
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
let output = document.getElementById('outputBox');
let isFirstDigit = true; // for the first input digit
let isFirstDigit2 = true; // for the first input digit
let isClicked = false; // for the operation 
let placeholder = "";
let amountOfCalculation = 0;

function showNum(event){
    let clickedBtn = event.target;
    
    // if the first digit input, it removes the default 0
    // else keeping adding on to the output
    if(isFirstDigit) {
        output.innerText = clickedBtn.innerText;
    } else if(isClicked){
        if(isFirstDigit2) {
            output.innerText = clickedBtn.innerText;
        } else {
            output.innerText += clickedBtn.innerText;
        }
        placeholder += clickedBtn.innerText;
        isFirstDigit2 = false;
    } else{ 
        output.innerText += clickedBtn.innerText;
        placeholder = output.innerText;
    }
    isFirstDigit = false;

    calcBtns.forEach((calc) => {
        calc.onclick = function(event){
            let calcButton = event.target;
            amountOfCalculation++;
            if(calcButton.innerText === '*' || calcButton.innerText === '/'){
                placeholder = "(" + placeholder + ")";
            }
            placeholder += calcButton.innerText;
            output.innerText = 0;
            isClicked = true;
            if(amountOfCalculation > 1) {
                isFirstDigit2 = true;
            }
        }
    });
    console.log(placeholder);
}


numBtns.forEach((button => {
    button.addEventListener('click', showNum);
}));

clear.addEventListener('click', () => {
    output.innerText = 0;
    isFirstDigit = true;
    isFirstDigit2 = true;
    isClicked = false;
    placeholder = "";
});
equal.addEventListener('click', () => {
    let result = Function("return " + placeholder)();
    output.innerText = result;
});