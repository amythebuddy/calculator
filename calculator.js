const calcBtns = document.querySelectorAll("button");
let output = document.getElementById('outputBox');

function show(event){
    let clickedBtn = event.target;
    output.innerText += clickedBtn.innerText;
}
calcBtns.forEach((button => {
    button.addEventListener('click', show);
}));
