addInitialListeners();

function addInitialListeners() {
  const textualInputFieldsDefault = document.querySelectorAll(".input-textual.default-validate input");
  for (let i = 0; i < textualInputFieldsDefault.length; i++) {
    textualInputFieldsDefault.item(i).addEventListener('blur', validateOnblur);
    textualInputFieldsDefault.item(i).addEventListener('focus', removeValidStyling);
  }
  const passwordVisibilityToggles = document.querySelectorAll(".input-pwd img")
  for (let i = 0; i < passwordVisibilityToggles.length; i++) {
    passwordVisibilityToggles.item(i).addEventListener('click', togglePasswordVisibility);
  }
  document.querySelector("#form-sign-up").addEventListener("submit", validateForm);
  const pwdInput = document.querySelector("#pwd");
  pwdInput.addEventListener("focus", displayPasswordRequirements);
  pwdInput.addEventListener("blur", hidePasswordRequirements);
  pwdInput.addEventListener("input", displaySatisfiedPasswordRequirements);
  pwdInput.addEventListener("input", validatePwdConfirmOnPwdInput);
  const pwdConfirm = document.querySelector("#pwd-confirm");
  pwdConfirm.addEventListener("blur", validateOnblurPwdConfirm);
  pwdConfirm.addEventListener("focus", removeValidStyling);
}

function validateOnblur(e) {
  if (this.value.length === 0) {
    this.classList.remove("invalid");
    this.classList.remove("valid");
    this.removeEventListener("input", validateOninput);
  }
  else if (this.checkValidity()) {
    this.classList.remove("invalid");
    this.classList.add("valid");
    this.removeEventListener("input", validateOninput);
  } else {
    this.classList.remove("valid");
    this.classList.add("invalid");
    this.addEventListener("input", validateOninput);
    
  }
}

function validateOninput() {
  if (this.checkValidity()) {
    this.classList.add("valid");
    this.classList.remove("invalid");
  } else {
    this.classList.add("invalid");
    this.classList.remove("valid");
  }
}

function removeValidStyling() {
  this.classList.remove("valid");
}

function validateOnblurPwdConfirm() {
  const pwd = document.querySelector("#pwd");
  const pwdConfirm = this;
  if (pwdConfirm.value.length === 0 || !pwd.checkValidity()) {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.remove("valid");
    pwdConfirm.removeEventListener("input", validateOninputPwdConfirm);
  } else if (pwdConfirm.value === pwd.value) {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.add("valid");
    pwdConfirm.removeEventListener("input", validateOninputPwdConfirm);
  } else {
    pwdConfirm.classList.remove("valid");
    pwdConfirm.classList.add("invalid");
    pwdConfirm.addEventListener("input", validateOninputPwdConfirm);
  }
}

function validateOninputPwdConfirm() {
  const pwd = document.querySelector("#pwd");
  const pwdConfirm = this;
  if (pwdConfirm.value.length === 0 || !pwd.checkValidity()) {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.remove("valid");
  } else if (pwdConfirm.value === pwd.value) {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.add("valid");
  } else {
    pwdConfirm.classList.remove("valid");
    pwdConfirm.classList.add("invalid");
  }
}

function validatePwdConfirmOnPwdInput() {
  const pwd = this;
  const pwdConfirm = document.querySelector("#pwd-confirm");
  if (pwdConfirm.value.length === 0 || !pwd.checkValidity()) {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.remove("valid");
  } else if (pwdConfirm.value === pwd.value) {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.add("valid");
  } else {
    pwdConfirm.classList.remove("valid");
    pwdConfirm.classList.add("invalid");
  }
}

function togglePasswordVisibility() {
 let pwdInput = this.previousElementSibling;
 if (pwdInput.getAttribute("type") === "password") {
  pwdInput.setAttribute("type", "text");
  this.setAttribute("src", "./img/vis-on.svg");
 } else {
  pwdInput.setAttribute("type", "password");
  this.setAttribute("src", "./img/vis-off.svg");
 }
}

function displayPasswordRequirements() {
  const pwdRequirementsContainer = document.querySelector("#password-requirements-container");
  pwdRequirementsContainer.setAttribute("style", "visibility: visible;");
  pwdRequirementsContainer.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
}

function hidePasswordRequirements() {
  document.querySelector("#password-requirements-container").setAttribute("style", "visibility: hidden;");
}

function displaySatisfiedPasswordRequirements() {

  function requirementNotSatisfiedStyling(passwordRequirement) {
    passwordRequirement.removeAttribute("style");
    if (passwordRequirement.textContent.includes("✓")) {
      passwordRequirement.textContent = passwordRequirement.textContent.substring(0, passwordRequirement.textContent.length - 2);
    }
  }

  function requirementSatisfiedStyling(passwordRequirement) {
    passwordRequirement.setAttribute("style", "color: green;");
    if (!passwordRequirement.textContent.includes("✓")) {
      passwordRequirement.textContent = passwordRequirement.textContent + " ✓";
    }
  }

  const pwdInputValue = document.getElementById("pwd").value;

  //the code below could be simplified with a helper function
  const passwordRequirement8To16 = document.getElementById("pr-8-to-16");
  if (pwdInputValue.length <= 7 || pwdInputValue.length >= 17) {
    requirementNotSatisfiedStyling(passwordRequirement8To16);
  } else {
    requirementSatisfiedStyling(passwordRequirement8To16);
  }

  const upperRegEx = /[A-Z]/;
  const passwordRequirementUpper = document.getElementById("pr-upper");
  if (!upperRegEx.test(pwdInputValue)) {
    requirementNotSatisfiedStyling(passwordRequirementUpper);
  } else {
    requirementSatisfiedStyling(passwordRequirementUpper);
  }

  const lowerRegEx = /[a-z]/;
  const passwordRequirementLower = document.getElementById("pr-lower");
  if (!lowerRegEx.test(pwdInputValue)) {
    requirementNotSatisfiedStyling(passwordRequirementLower);
  } else {
    requirementSatisfiedStyling(passwordRequirementLower);
  }

  const numberRegEx = /[0-9]/;
  const passwordRequirementNumber = document.getElementById("pr-number");
  if (!numberRegEx.test(pwdInputValue)) {
    requirementNotSatisfiedStyling(passwordRequirementNumber);
  } else {
    requirementSatisfiedStyling(passwordRequirementNumber);
  }

}

function validateForm(e) {
  const pwd = document.querySelector("#pwd");
  const pwdConfirm = document.querySelector("#pwd-confirm");
  if (!document.querySelector("#form-sign-up").checkValidity() || pwd.value !== pwdConfirm.value) {
    e.preventDefault();
    failedSubmitBehaviour();
  }
}

function failedSubmitBehaviour() {
  const textualInputFieldsDefault = document.querySelectorAll(".input-textual.default-validate input");
  for (let i = 0; i < textualInputFieldsDefault.length; i++) {
    const textualInput = textualInputFieldsDefault.item(i);
    textualInput.removeEventListener('blur', validateOnblur);
    textualInput.removeEventListener('focus', removeValidStyling);
    textualInput.addEventListener("input", validateOninput);
    if (!textualInput.checkValidity()) {
      textualInput.classList.add("invalid");
      textualInput.classList.remove("valid");
    } else {
      textualInput.classList.remove("invalid");
      textualInput.classList.add("valid");
    }
  }
  const pwdConfirm = document.querySelector("#pwd-confirm");
  pwdConfirm.removeEventListener('blur', validateOnblurPwdConfirm);
  pwdConfirm.removeEventListener('focus', removeValidStyling);
  pwdConfirm.addEventListener('input', validateOninputPwdConfirm);
  const pwd = document.querySelector("#pwd");
  if (!pwdConfirm.checkValidity() || pwd.value !== pwdConfirm.value) {
    pwdConfirm.classList.add("invalid");
    pwdConfirm.classList.remove("valid");
  } else {
    pwdConfirm.classList.remove("invalid");
    pwdConfirm.classList.add("valid");
  }
}
