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