const numBtns = document.querySelectorAll(".showNumber");
const calcBtns = document.querySelectorAll('.operation')
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
let output = document.getElementById('outputBox');
let isFirstDigit = true; // for the first input digit
let isFirstDigit2 = true; // for the second input digit
let isClicked = false; // for the operation 
let calculation = ""; // store the calculation
let amountOfCalculation = 0;

function showNum(event){
    let clickedBtn = event.target;
    
    // if the first digit input, it removes the default 0
    // else keeping adding on to the output
    if(isFirstDigit) {
        output.innerText = clickedBtn.innerText;
        calculation = output.innerText;
    } else if(isClicked){ // for the second number 
        if(isFirstDigit2) { // if it's the first digit, then change the 0 
            output.innerText = clickedBtn.innerText;
        } else { // else keep adding onto the number
            output.innerText += clickedBtn.innerText;
        }
        calculation += clickedBtn.innerText;
        isFirstDigit2 = false;
    } else{ 
        output.innerText += clickedBtn.innerText;
        calculation = output.innerText;
    }
    isFirstDigit = false;

    calcBtns.forEach((calc) => {
        calc.onclick = function(event){
            let calcButton = event.target;
            amountOfCalculation++;
            if(calcButton.innerText === '*' || calcButton.innerText === '/'){
                calculation = "(" + calculation + ")";
            }
            calculation += calcButton.innerText;
            output.innerText = 0;
            isClicked = true;
            if(amountOfCalculation > 1) {
                isFirstDigit2 = true;
            }
        }
    });

    clear.onclick = function() {
        output.innerText = 0;
        isFirstDigit = true;
        isFirstDigit2 = true;
        isClicked = false;
        calculation = "";
        amountOfCalculation = 0;
    }
    console.log(calculation);
}


numBtns.forEach((button => {
    button.addEventListener('click', showNum); 
}));

equal.addEventListener('click', () => {
    let result = Function("return " + calculation)();
    
    if(result == undefined){ 
        alert("You need to input number first before pressing equal!");
        return;
    }
    if(!Number.isInteger(result)) result = result.toFixed(3);

    //if result is divided by 0, output is error
    if(Number.isFinite(parseFloat(result))) output.innerText = result;
    else output.innerText = "ERROR";
});