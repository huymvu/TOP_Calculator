let num = [];
let operator = [];
let result;
const screenDisplay = document.querySelector('.display');

const numButtons = document.querySelectorAll('.num-btn');
numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (operator.length === 1) { // start getting 2nd input number after operator
            let clickedNumber = e.target.textContent;
            num.push(clickedNumber); // push it to num array [num1, num2]
            let tempArray = num.splice(1); // remove num2 from num array -> num=[num1]; tempArray = [num2]
            let inputNumber = tempArray.join(""); // join the digits that user clicks to get final input number e.g.:"2222"->2222
            if (inputNumber.includes(".") === true) { //disable "." if there is already one
                document.getElementById("decimal").disabled = true;
            }
            num.push(inputNumber); // push the final inputNumber to num array for calculation -> num=[num1,inputNumber]
            screenDisplay.textContent = inputNumber; // display the clicked number 
            return; // exit this event listener function
        }
        let clickedNumber = e.target.textContent;
        num.push(clickedNumber); //num = [num1] e.g [1,1,1,1]
        let inputNumber = num.join(""); //e.g: num1="1111" -> num=1111
        if (inputNumber.includes(".") === true) { //disable "." if there is already one
            document.getElementById("decimal").disabled = true;
        }
        num.splice(0);  //empty the num array since num array currently has [1,1,1,1]
        num.push(inputNumber); //push the final input number to num array -> num=[1111]
        screenDisplay.textContent = inputNumber; // display the clicked number
    })
});

const operatorButtons = document.querySelectorAll('.operator-btn');
operatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        document.getElementById("decimal").disabled = false; //re-enable "."
        if (num.length === 2 && operator.length === 1) { //check if there are 2 input numbers and a operator to do calculation
            result = operate(num[0], operator[0], num[1]) //call operate function for calculation
            screenDisplay.textContent = result; //display returned result
            if (typeof (result) === "string") { //when divide by 0, result is a warning string
                alert("Enter positive number for division") //ask user to re-enter number for division
                num.splice(1, 1); //remove 0 from num array
                return; // exit this event listener function
            } else { //if there is no error
                num.splice(0); //empty num array
                num.push(String(result)); //insert the result into num array as a string to implement delete button
                operator.splice(0); //empty operator array
                // return; // exit this event listener function
            }
        }
        else if (num.length === 1 && e.target.textContent === "=") { //if "=" is pressed before entering 2nd number and an operator
            alert("Enter an operator for calculation"); //ask user to re-enter an operator first
            return;// exit this event listener function
        }
        else if (num.length === 0 && e.target.textContent === "=") { // if "=" is pressed at the very first
            alert("Enter a number first"); //ask user to enter a number first;
            return;
        }
        let clickedOperator = e.target.textContent;
        if (clickedOperator === "=") {
            return;
        }
        operator.push(clickedOperator); //insert current clicked operator to operator array
    })
});

//clear function to reset everything
const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', (e) => {
    num.splice(0);
    operator.splice(0);
    screenDisplay.textContent = 0;
});

//delete button
const deleteButton = document.querySelector('.delete-btn');
deleteButton.addEventListener('click', (e) => {
    if (screenDisplay.textContent.slice(-1) === "." || isNaN(screenDisplay.textContent.slice(-1)) === false) {
        if (num.length < 2) {
            if (num.length === 0) {
                return;
            }
            let trimArray = num[0].slice(0, -1); //remove last letter e.g. ["ab"]->["a"]
            num.splice(0);
            num.push(trimArray);
            screenDisplay.textContent = num[0];
        }
        else {
            let trimArray = num[1].slice(0, -1);
            num.splice(1);
            num.push(trimArray);
            screenDisplay.textContent = num[1];
        }
    }
    else {
        operator.pop();
    }
})

//operate function to perform different calculations based on user input
function operate(firstNum, operator, secondNum) {
    if (operator == "+") {
        return add(firstNum, secondNum);
    } else if (operator == "-") {
        return subtract(firstNum, secondNum);
    } else if (operator == "*") {
        return multiply(firstNum, secondNum);
    } else if (operator == "/") {
        return divide(firstNum, secondNum);
    }
}

function add(a, b) {
    let ans = parseFloat(a) + parseFloat(b);
    return Math.round(ans * 10) / 10;;
}

function subtract(a, b) {
    let ans = parseFloat(a) - parseFloat(b);
    return Math.round(ans * 10) / 10;
}

function multiply(a, b) {
    let ans = parseFloat(a) * parseFloat(b);
    return Math.round(ans * 10) / 10;
}

function divide(a, b) {
    if (parseFloat(b) === 0) {
        return "Divide by 0!?"
    }
    let ans = parseFloat(a) / parseFloat(b);
    return Math.round(ans * 10) / 10;
}