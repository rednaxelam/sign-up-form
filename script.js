addInitialListeners();

function addInitialListeners() {
  const textualInputFields = document.querySelectorAll(".input-textual>input");
  for (let i = 0; i < textualInputFields.length; i++) {
    textualInputFields.item(i).addEventListener('blur', validateOnblur);
    textualInputFields.item(i).addEventListener('focus', removeValidStyling);
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

function failedSubmitBehaviour() {
  if (!document.querySelector("#form-sign-up").checkValidity()) {
    const textualInputFields = document.querySelectorAll(".input-textual>input");
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