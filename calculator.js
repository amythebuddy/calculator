const numBtns = document.querySelectorAll(".showNumber");
const calcBtns = document.querySelectorAll('.operation')
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const negative = document.getElementById('neg');
const percent = document.getElementById('percent');
let output = document.getElementById('outputBox');
let isFirstDigit = true; // for the first input digit
let isFirstDigit2 = true; // for the second input digit
let isNegative = false; // for the negative number
let isClicked = false; // for the operation 
let calculation = ""; // store the calculation
let amountOfCalculation = 0;

function showNum(event){
    let clickedBtn = event.target;

    //if output includes negative, then remove the negative sign
    negative.onclick = function() {
        if(output.innerText.includes('-')){
            output.innerText = output.innerText.slice(1);
            isNegative = false;
        } else { // else add the negative sign
            output.innerText = '-' + output.innerText;
            // calculation = output.innerText;
            isNegative = true;
        }
        console.log("hi");
    };

    if(isFirstDigit) {// if the first digit input, it removes the default 0
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
    } else if(isFirstDigit && isNegative){
        output.innerText = '-' + output.innerText;
        output.innerText += clickedBtn.innerText;
        calculation = output.innerText;
    }  else{ // else keeping adding on to the first number output
        output.innerText += clickedBtn.innerText;
        calculation = output.innerText;
    }
    isFirstDigit = false;

    calcBtns.forEach((calc) => {
        calc.onclick = function(event){
            let calcButton = event.target;
            amountOfCalculation++;
            if(calcButton.innerText === '*' || calcButton.innerText === '/'){
                calculation = "(" + calculation + ")"; //to keep multiplying or dividing the whole previous calculation
            }
            calculation += calcButton.innerText;
            output.innerText = 0;
            isClicked = true; // activate the second number input
            if(amountOfCalculation > 1) { //if there is more than 1 calculation, add on the second number every time
                isFirstDigit2 = true; 
            }
        }
    });

    clear.onclick = function() { //reset everything back to the declaration
        output.innerText = 0;
        isFirstDigit = true;
        isFirstDigit2 = true;
        isClicked = false;
        calculation = "";
        amountOfCalculation = 0;
    }
    console.log(calculation);
}

equal.addEventListener('click', () => {
    let result = Function("return " + calculation)(); // calculate the expression using the Function constructor
    
    if(result == undefined){ 
        alert("You need to input number first before pressing equal!");
        return;
    }
    if(!Number.isInteger(result)) result = result.toFixed(2); //if it is decimal, reduce it back to the nearest 100th

    //if result is divided by 0, output is error
    if(Number.isFinite(parseFloat(result))) output.innerText = result;
    else output.innerText = "ERROR";
});



numBtns.forEach(function (button) {
    button.addEventListener('click', showNum); 
});
