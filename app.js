const numberButtons = Array.from(document.querySelectorAll('[data-number]'));
const operationButtons = Array.from(document.querySelectorAll('[data-operation]'));
const equalsButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButtons = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

numberButtons.map(button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        if(currentOperandTextElement.innerText == '/' || 
        currentOperandTextElement.innerText == '*' ||
        currentOperandTextElement.innerText == '+' ||
        currentOperandTextElement.innerText == '-') {
            currentOperandTextElement.innerText = e.target.innerText;
        } else{
            currentOperandTextElement.innerText += e.target.innerText;
        }
        
    })    
});

operationButtons.map(button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        currentOperandTextElement.innerText = e.target.innerText;
    })
}); 

const equateEquation = equalsButtons.addEventListener('click', function() {
    // currentOperandTextElement.innerText = '';
})

const clearScreen = allClearButtons.addEventListener('click', function(){
    currentOperandTextElement.innerText = '';
})