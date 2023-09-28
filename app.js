const billInput = document.getElementById("bill__input");
const customInput = document.getElementById("custom__input");
const peopleInput = document.getElementById("people__input");
const tipAmountElement = document.getElementById("tip__amount");
const totalAmountElement = document.getElementById("total__amount");
const resetButton = document.getElementById("reset__button");
const tipButtons = document.querySelectorAll(".tip__button");
const containers = document.querySelectorAll(".input__container");

let selectedTipPercentage = 0;

function calculateTip() {
  const billAmount = parseFloat(billInput.value) || 0;
  const customTipPercentage = parseFloat(customInput.value) || 0;
  const numberOfPeople = parseInt(peopleInput.value) || 1;

  selectedTipPercentage = customInput.value ? customTipPercentage : selectedTipPercentage;

  const tipAmount = (billAmount * (selectedTipPercentage / 100)) / numberOfPeople;
  const totalAmount = billAmount / numberOfPeople + tipAmount;

  tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
}

function handleTipButtonClick(button) {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  selectedTipPercentage = parseFloat(button.textContent);
  customInput.value = "";
  calculateTip();
}

billInput.addEventListener("input", calculateTip);
customInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);

tipButtons.forEach((button) => {
  button.addEventListener("click", () => handleTipButtonClick(button));
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
});

containers.forEach((container) => {
  container.addEventListener("click", (event) => {
    containers.forEach((c) => c.classList.remove("input__container--active"));
    container.classList.add("input__container--active");
    event.stopPropagation();
  });
});

document.addEventListener("click", () => {
  containers.forEach((container) => container.classList.remove("input__container--active"));
});
