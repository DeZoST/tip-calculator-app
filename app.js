const bodyContainer = document.querySelector("body");
const billContainer = document.getElementById("bill__container");
const billInput = document.getElementById("bill__input");
const peopleInput = document.getElementById("people__input");
const peopleContainer = document.getElementById("people__container");
const customInput = document.getElementById("custom__input");
const resetButton = document.getElementById("reset__button");
const tipAmountElement = document.getElementById("tip__amount");
const totalAmountElement = document.getElementById("total__amount");

let customTipActive = false;

/**
 * Calculate the tip amount and total amount per person.
 */
function calculateTip() {
  // Get the bill amount from the input field
  const billAmount = parseFloat(billInput.value);
  
  // Get the custom tip percentage from the input field, or set it to 0 if not provided
  const customTipPercentage = parseFloat(customInput.value) || 0;
  
  // Get the number of people from the input field, or set it to 1 if not provided
  const numberOfPeople = parseInt(peopleInput.value) || 1;

  // Calculate the selected percentage based on whether the custom tip is active or not
  let selectedPercentage = customTipActive ? customTipPercentage : getSelectedDefaultPercentage();

  // Calculate the tip amount per person
  const tipAmount = (billAmount * (selectedPercentage / 100)) / numberOfPeople;
  
  // Calculate the total amount per person (bill amount + tip amount)
  const totalAmount = billAmount / numberOfPeople + tipAmount;

  // Display the tip amount with 2 decimal places
  tipAmountElement.textContent = tipAmount.toFixed(2);
  
  // Display the total amount with 2 decimal places
  totalAmountElement.textContent = totalAmount.toFixed(2);
}

/**
 * Returns the selected default percentage value.
 * @returns {number} The selected default percentage value.
 */
function getSelectedDefaultPercentage() {
  // Find the active button
  const activeButton = Array.from(document.querySelectorAll(".tip__button"))
    .find(button => button.classList.contains("active"));

  // Parse the text content of the active button and convert it to a float
  return parseFloat(activeButton?.textContent) || 0;
}



document.getElementById("bill__input").addEventListener("input", calculateTip);
document.getElementById("custom__input").addEventListener("input", () => {
  customTipActive = true;
  calculateTip();
});
document.getElementById("people__input").addEventListener("input", calculateTip);


const percentageButtons = document.querySelectorAll(".tip__button");
percentageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    customTipActive = false;
    percentageButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    calculateTip();
  });
});
calculateTip();

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
});

billContainer.addEventListener("click", () => {
  if (
    peopleContainer.classList.contains("input__container--active") ||
    customInput.classList.contains("input__container--active")
  ) {
    peopleContainer.classList.remove("input__container--active");
    billContainer.classList.add("input__container--active");
    customInput.classList.remove("input__container--active");
  } else {
    billContainer.classList.add("input__container--active");
  }
});

customInput.addEventListener("click", () => {
  if (
    billContainer.classList.contains("input__container--active") ||
    peopleContainer.classList.contains("input__container--active")
  ) {
    billContainer.classList.remove("input__container--active");
    peopleContainer.classList.remove("input__container--active");
    customInput.classList.add("input__container--active");
  } else {
    customInput.classList.add("input__container--active");
  }
});

peopleContainer.addEventListener("click", () => {
  if (
    billContainer.classList.contains("input__container--active") ||
    customInput.classList.contains("input__container--active")
  ) {
    billContainer.classList.remove("input__container--active");
    peopleContainer.classList.add("input__container--active");
    customInput.classList.remove("input__container--active");
  } else {
    peopleContainer.classList.add("input__container--active");
  }
});
