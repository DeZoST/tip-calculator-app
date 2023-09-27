const bodyContainer = document.querySelector("body");
const billContainer = document.getElementById("bill__container");
const peopleContainer = document.getElementById("people__container");

const billInput = document.getElementById("bill__input");
const customInput = document.getElementById("custom__input");
const peopleInput = document.getElementById("people__input");
const tipAmountElement = document.getElementById("tip__amount");
const totalAmountElement = document.getElementById("total__amount");
const resetButton = document.getElementById("reset__button");


let customTipActive = false;

function calculateTip() {
  const billAmount = parseFloat(billInput.value) || 0;
  const customTipPercentage = parseFloat(customInput.value) || 0;
  const numberOfPeople = parseInt(peopleInput.value) || 1;
  const selectedPercentage = customTipActive ? customTipPercentage : getSelectedDefaultPercentage();

  const tipAmount = (billAmount * (selectedPercentage / 100)) / numberOfPeople;
  const totalAmount = billAmount / numberOfPeople + tipAmount;

  tipAmountElement.textContent = "$" + tipAmount.toFixed(2);
  totalAmountElement.textContent = "$" + totalAmount.toFixed(2);
}

function getSelectedDefaultPercentage() {
  const activeButton = document.querySelector(".tip__button.active");
  return parseFloat(activeButton?.textContent) || 0;
}

function handleTipButtonClick(button) {
  customTipActive = false;
  const buttons = document.querySelectorAll(".tip__button");
  buttons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  calculateTip();
}

billInput.addEventListener("input", calculateTip);
customInput.addEventListener("input", () => {
  customTipActive = true;
  calculateTip();
});
peopleInput.addEventListener("input", calculateTip);

const percentageButtons = document.querySelectorAll(".tip__button");
percentageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleTipButtonClick(button);
  });
});

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
});

function setActiveContainer(mainContainer, otherContainers) {
  if (!mainContainer.classList.contains("input__container--active")) {
    mainContainer.classList.add("input__container--active");
    otherContainers.forEach((otherContainer) => {
      otherContainer.classList.remove("input__container--active");
    });
  }
}

billContainer.addEventListener("click", () => {
  setActiveContainer(billContainer, [customInput, peopleContainer]);
});

customInput.addEventListener("click", () => {
  setActiveContainer(customInput, [billContainer, peopleContainer]);
});

peopleContainer.addEventListener("click", () => {
  setActiveContainer(peopleContainer, [billContainer, customInput]);
});
