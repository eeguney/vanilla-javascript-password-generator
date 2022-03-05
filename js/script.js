// loading animations
let form = document.querySelector(".form");
let button = document.querySelector("#generate-button");
let generatedPassword = document.querySelector("#generated_password");
let copyToClipboardBTN = document.querySelector(".copyToClipboard");
let passwordLength = document.querySelector("#range");
let passwordLengthLabel = document.querySelector("#password_length--span");
let uppercase = document.querySelector("#uppercase");
let lowercase = document.querySelector("#lowercase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");

// loading animations
window.addEventListener("load", function () {
  form.classList.add("formAnimation");
  button.classList.add("buttonAnimation");
});

let elements = {
  passwordLengthLabel,
  uppercase,
  lowercase,
  numbers,
  symbols,
  generatedPassword,
};

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

let options = {
  lenght: 12,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  password: "",
};

// initialize
passwordLengthLabel.value = 12;
elements.generatedPassword.innerHTML = options.password;
generatePassword();

// Add event listeners
passwordLength.addEventListener("input", sliderChange);
uppercase.addEventListener("click", selectChange);
lowercase.addEventListener("click", selectChange);
numbers.addEventListener("click", selectChange);
symbols.addEventListener("click", selectChange);
button.addEventListener("click", generatePassword);
copyToClipboardBTN.addEventListener("click", copyToClipboard);

function generatePassword() {
  let newPassword = "";
  let upper = options.uppercase;
  let lower = options.lowercase;
  let number = options.numbers;
  let symbol = options.symbols;
  let typeCount =
    options.uppercase + options.lowercase + options.numbers + options.symbols;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typeCount === 0) return;

  for (let i = 0; i < options.lenght; i += typeCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];

      newPassword += randomFunction[funcName]();
    });
  }
  newPassword = newPassword.slice(0, options.lenght);

  if (newPassword.length > 25) {
    elements.generatedPassword.style.cssText = "font-size: 27px";
  } else {
    elements.generatedPassword.style.cssText = "font-size: 45px";
  }

  elements.generatedPassword.innerHTML = newPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function update(element) {
  elements.passwordLengthLabel.innerHTML = options.lenght;
  if (element !== undefined)
    if (options[element]) {
      elements[element].classList.remove("disable");
      elements[element].classList.add("active");
    } else {
      elements[element].classList.remove("active");
      elements[element].classList.add("disable");
    }
  generatePassword();
}

// slider handler
function sliderChange({ target }) {
  options = { ...options, lenght: target.value };
  update();
}

function selectChange({ target }) {
  options = { ...options, [target.id]: !options[target.id] };
  console.log(options);
  update(target.id);
}

function copyToClipboard() {
  let newTxtArea = document.createElement("textarea");
  newTxtArea.innerText = elements.generatedPassword.innerHTML;
  document.body.appendChild(newTxtArea);
  newTxtArea.select();
  document.execCommand("copy");
  newTxtArea.remove();
  alert("Password copied to clipboard!");
}
