class Calculator {
    // construct our calculator object, using the current and previous numbers as means of calculation
    constructor(previousOperandTextElement, currentOperandTextElement) {
        // set them to the two divs that contain the corresponding numbers
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        // clear the fields that may contain numbers
        this.currentOperand = ''
        this.previousOperand = ''
        // and have no operation in memory
        this.operation = undefined
    }

    // DEL button (works like backspace)
    delete() {
        // shorten the current operand by converting it to a string, slicing off the end,
        // returning the rest and reassigning it to the currentOperand variable
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    // logic for appending numbers together in traditional calculator fashion
    appendNumber(number) {
        // if the number in question is a . and we already have a . return and do nothing
        if (number === '.' && this.currentOperand.includes('.')) return
        // take the number provided, convert it to a string, then concatenate it with the
        // current operand, which is also a string
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // select which operation we are conducting
    chooseOperation(operation) {
        // if its an empty string, return and do nothing
        if (this.currentOperand === '') return
        // check to ensure our last operand isn't an empty string (therefor a number)
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    // logic for performing math
    compute() {
        // establish an answer variable
        let computation
        // assign previous and current operands to variables
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // if either aren't a number, return since we can't do math
        if (isNaN(prev) || isNaN(current)) return
        // our switch statement, which varies depending on what sort
        // of operation we're performing
        switch(this.operation) {
            case '+': 
                computation = prev + current
                break
            case '-': 
                computation = prev - current
                break
            case '*': 
                computation = prev * current
                break
            case '÷': 
                computation = prev / current
                break
            default: 
                return
        }
        // display our answer as the current operand
        this.currentOperand = computation
        // operation goes back to being undefined
        this.operation = undefined
        // clear the previous operand screen
        this.previousOperand = ''

    }

    // this function formats our input, adding commas
    getDisplayNumber(number) {
        // convert number to string
        const stringNumber = number.toString()
        // get whole numbers, left of decimal point
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        // get decimals, right of decmial point
        const decimalDigits = stringNumber.split('.')[1]
        // format our integer number for US, with commas (1,000)
        let integerDisplay
        // checking for non-numbers
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            // this line formats with commas, and doesn't
            // allow for more .
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        // if there are decimal digits, return them in this template
        // string. If there aren't, just return the integers
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        // update and use the formatted text for our display numbers
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if(this.operation != null) {
            // when we first type in an operation (6 +), set the previous operand 
            // to that text
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}

// our variables, queried by data attributes
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

// create our new calculator vis the current and previous operands
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// event listeners 

// when a number is pressed, append the number and update the display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})


// when an operation is pressed, choose it and update the display
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

// same with others, equals, clear, delete
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})