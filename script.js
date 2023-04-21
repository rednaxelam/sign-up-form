addInitialListeners();

function addInitialListeners() {
  const textualInputFields = document.querySelectorAll(".input-textual input");
  for (let i = 0; i < textualInputFields.length; i++) {
    textualInputFields.item(i).addEventListener('blur', validateOnblur);
    textualInputFields.item(i).addEventListener('focus', removeValidStyling);
  }
  const passwordVisibilityToggles = document.querySelectorAll(".input-pwd img")
  for (let i = 0; i < passwordVisibilityToggles.length; i++) {
    passwordVisibilityToggles.item(i).addEventListener('click', togglePasswordVisibility);
  }
  document.querySelector('button[type="submit"]').addEventListener("click", failedSubmitBehaviour);
  const pwdInput = document.querySelector("#pwd");
  pwdInput.addEventListener("focus", displayPasswordRequirements);
  pwdInput.addEventListener("blur", hidePasswordRequirements);
  pwdInput.addEventListener("input", displaySatisfiedPasswordRequirements);
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

function togglePasswordVisibility() {
 let pwdInput = this.previousElementSibling;
 if (pwdInput.getAttribute("type") === "password") {
  pwdInput.setAttribute("type", "text");
  this.setAttribute("src", "./img/vis-off.svg");
 } else {
  pwdInput.setAttribute("type", "password");
  this.setAttribute("src", "./img/vis-on.svg");
 }
}

function displayPasswordRequirements() {
  document.querySelector("#password-requirements-container").setAttribute("style", "visibility: visible;");
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

function failedSubmitBehaviour() {
  if (!document.querySelector("#form-sign-up").checkValidity()) {
    const textualInputFields = document.querySelectorAll(".input-textual input");
    for (let i = 0; i < textualInputFields.length; i++) {
      const textualInput = textualInputFields.item(i);
      textualInput.removeEventListener('blur', validateOnblur);
      textualInput.addEventListener("input", validateOninput);
      if (!textualInput.checkValidity()) {
        textualInput.classList.add("invalid");
        textualInput.classList.remove("valid");
      }
    }
  }
}
