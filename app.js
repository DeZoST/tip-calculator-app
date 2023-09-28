// Sélection des éléments du DOM
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

// Fonctions utilitaire

// Vérifie si une chaîne de caractères contient des lettres
function containsAnyLetters(value) {
  return /[^\d.,]/.test(value);
}

// Réinitialise les inputContainers
function resetInputContainers() {
  inputContainers.forEach((container) => {
    container.classList.remove("input__container--active");
    container.classList.remove("input__container--error");
  });
  customInput.classList.remove("input__container--error");
}

// Gère les modifications d'entrée
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

// Gère les clics sur les boutons de pourboire
function handleTipButtonClick(button) {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");
  selectedTipPercentage = parseFloat(button.textContent);
  customInput.value = "";
  calculateTip();
}

// Fonction de calcul du pourboire et du montant total
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

// Event Listeners

// Gestion des modifications d'entrée dans les inputFields
inputFields.forEach((input, index) => {
  input.addEventListener("input", () => {
    handleInputChange(input, inputContainers[index]);
  });
});

// Gestion des modifications d'entrée dans le customInput
customInput.addEventListener("input", () => {
  handleInputChange(customInput, customInput);
});

// Gestion des clics sur les tipButtons
tipButtons.forEach((button) => {
  button.addEventListener("click", () => handleTipButtonClick(button));
});

// Gestion du clic sur le reseButton
resetButton.addEventListener("click", () => {
  // Réinitialisation des inputFields
  inputFields.forEach((input, index) => {
    input.value = "";
    inputContainers[index].classList.remove("input__container--error");
  });

  // Désélection des tipButtons
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Réinitialisation du customInput
  customInput.value = "";

  // Réinitialisation des inputContainers
  resetInputContainers();

  // Réinitialisation des affichages des montants
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
});

// Gestion des clics sur les inputContainers pour les mettre en surbrillance
inputContainers.forEach((container) => {
  container.addEventListener("click", (event) => {
    resetInputContainers();
    container.classList.add("input__container--active");
    event.stopPropagation();
  });
});

// Gestion des clics en dehors des inputContainers pour désélectionner tout
document.addEventListener("click", () => {
  resetInputContainers();
});
