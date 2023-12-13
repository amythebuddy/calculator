const numBtns = document.querySelectorAll(".showNumber");
const calcBtns = document.querySelectorAll('.operation');
const clear = document.getElementById('clear');
const equal = document.getElementById('equal');
const negative = document.getElementById('neg');
const factorial = document.getElementById('factorial');
let output = document.getElementById('outputBox');
let isFirstDigit = true; // for the first input digit
let isFirstDigit2 = true; // for the second input digit
let isNegative = false; // for the negative number
let isClicked = false; // for the operation 
let isSecondDecimal = false; // in case the user clicks the . twice
let calculation = ""; // store the calculation
let amountOfCalculation = 0;
let arrFactorial = [];

function showNum(event){
    let clickedBtn = event.target;

    //Condition : You need to press any number first then press this button for the negative sign to appear
    // You cannot add the negative sign to the default 0

    //if output includes negative, then remove the negative sign
    negative.onclick = function() {
        if(output.innerText.includes('-')){
            output.innerText = output.innerText.slice(1);
            isNegative = false;
        } else { // else add the negative sign
            output.innerText = '-' + output.innerText;
            isNegative = true;
        }
        calculation = output.innerText;
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
    } else{ // else keeping adding on to the first number output
        output.innerText += clickedBtn.innerText;
        calculation = output.innerText;
    }
    isFirstDigit = false; // to stop changing the digit

    calcBtns.forEach((calc) => { // operation
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
    };

    equal.onclick = function() {
        let result = Function("return " + calculation)(); // calculate the expression using the Function constructor
        
        if(result == undefined){ 
            alert("You need to input number first before pressing equal!");
            return;
        }
        if(!Number.isInteger(result)) result = result.toFixed(2); //if it is decimal, reduce it back to the nearest 100th

        //if number is divided by 0,  display  error
        if(Number.isFinite(parseFloat(result))) output.innerText = result;
        else output.innerText = "ERROR";

    };

    factorial.onclick = function() {
        output.innerText = calcFactorial(parseFloat(output.innerText)); // display the result of factorial
        calculation = output.innerText; 
    };

}

function calcFactorial(n) { //using recursive to do factorial
    if(n < 0) {
        output.innerText = "ERROR";
    }
    if (n == 0 || n == 1) return 1;
    if (arrFactorial[n] > 0) return arrFactorial[n];
    return arrFactorial[n] = calcFactorial(n-1) * n;
}

numBtns.forEach(function (button) {
    button.addEventListener('click', showNum); 
});
