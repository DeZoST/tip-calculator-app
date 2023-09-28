const inputFields = document.querySelectorAll(".input__field");
const tipButtons = document.querySelectorAll(".tip__button");
const inputContainers = document.querySelectorAll(".input__container");
const billInput = document.getElementById("bill__input");
const customInput = document.getElementById("custom__input");
const peopleInput = document.getElementById("people__input");
const tipAmountElement = document.getElementById("tip__amount");
const totalAmountElement = document.getElementById("total__amount");
const resetButton = document.getElementById("reset__button");
let selectedTipPercentage = 0;

function containsAnyLetters(value) {
  return /[^\d.,]/.test(value);
}

function resetInputContainers() {
  inputContainers.forEach((container) => {
    container.classList.remove("input__container--active");
    container.classList.remove("input__container--error");
  });
  customInput.classList.remove("input__container--error");
}

function handleInputChange(input, container) {
  if (containsAnyLetters(input.value)) {
    container.classList.remove("input__container--active");
    container.classList.add("input__container--error");
    input.value = "";
  } else {
    container.classList.remove("input__container--error");
    calculateTip();
  }
}

function handleTipButtonClick(button) {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  selectedTipPercentage = parseFloat(button.textContent);
  customInput.value = "";
  calculateTip();
}

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

inputFields.forEach((input, index) => {
  input.addEventListener("input", () => {
    handleInputChange(input, inputContainers[index]);
  });
});

customInput.addEventListener("input", () => {
  handleInputChange(customInput, customInput);
})

tipButtons.forEach((button) => {
  button.addEventListener("click", () => handleTipButtonClick(button));
});

resetButton.addEventListener("click", () => {
  inputFields.forEach((input, index) => {
    input.value = "";
    inputContainers[index].classList.remove("input__container--error");
  });

  tipButtons.forEach((button) => {
    button.classList.remove("active");
  })

  customInput.value = "";
  resetInputContainers();
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
});

inputContainers.forEach((container) => {
  container.addEventListener("click", (event) => {
    resetInputContainers();
    container.classList.add("input__container--active");
    event.stopPropagation();
  });
});

document.addEventListener("click", () => {
  resetInputContainers();
});
