const contactForm = document.querySelector(".contact__form");
const sendSuccess = document.querySelector(".send-success");
const submitButton = document.querySelector(".submit-button");
const sending = document.querySelector(".sending");
const fullName = document.querySelector("#name");
const nameError = document.querySelector("#name-error");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");
const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const stylesToChange = (elementName, errorName, border, color, errorDisplay) => {
  successMessage.style.display = "none";

  elementName.style.border = border;
  elementName.style.borderBottom = `2px ${color} solid`;
  errorName.style.display = errorDisplay;
};

//Check input is the required length
const checkRequiredLength = (userInput, maxMin, requiredLength) => {
  if (maxMin === "min") {
    if (userInput.trim().length >= requiredLength) {
      return true;
    } else {
      return false;
    }
  } else if (maxMin === "max") {
    if (userInput.trim().length <= requiredLength) {
      return true;
    } else {
      return false;
    }
  }
};

//Check email is formated like an email
const emailRegEx = /\S+@\S+\.\S+/;
const validateEmail = (userInput, regEx) => {
  const checkInput = regEx.test(userInput);
  return checkInput;
};

//validate form
const validateForm = () => {
  if (
    checkRequiredLength(fullName.value, "min", 5) &&
    validateEmail(email.value, emailRegEx) &&
    checkRequiredLength(message.value, "max", 500) &&
    checkRequiredLength(message.value, "min", 25)
  ) {
    submitButton.disabled = false;
    return true;
  } else {
    submitButton.disabled = true;
    return false;
  }
};

//Check inputs of the form are valid before sending
const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    submitButton.disabled = true;
    sendSuccess.style.display = "flex";
    stylesToChange(fullName, nameError, "none", "var(--light-background-color)", "none");
    stylesToChange(email, emailError, "none", "var(--light-background-color)", "none");
    message.style.border = "2px var(--light-background-color) solid";
    messageError.style.display = "none";
  } else {
    if (!checkRequiredLength(fullName.value, "min", 5)) {
      fullName.style.border = "2px var(--main-cta-color) solid";
      nameError.style.display = "block";
    }
    if (!validateEmail(email.value, emailRegEx)) {
      email.style.border = "2px var(--main-cta-color) solid";
      emailError.style.display = "block";
    }
    if (
      !checkRequiredLength(message.value, "max", 500) &&
      !checkRequiredLength(message.value, "min", 25)
    ) {
      message.style.border = "2px var(--main-cta-color) solid";
      messageError.style.display = "block";
    }
  }
};

// form.addEventListener("submit", handleSubmit);

const successMessage = document.querySelector(".send-success");

const handleKeyUpName = () => {
  successMessage.style.display = "none";
  if (checkRequiredLength(fullName.value, "min", 5)) {
    stylesToChange(fullName, nameError, "none", "var(--success-color)", "none");
  }
  validateForm();
};

const handleFocusOutName = () => {
  if (checkRequiredLength(fullName.value, "min", 5)) {
    stylesToChange(fullName, nameError, "none", "var(--success-color)", "none");
  }
  if (!checkRequiredLength(fullName.value, "min", 5)) {
    fullName.style.border = "2px var(--main-cta-color) solid";
    nameError.style.display = "block";
  }
  validateForm();
};

const handleKeyUpEmail = () => {
  successMessage.style.display = "none";
  if (validateEmail(email.value, emailRegEx)) {
    stylesToChange(email, emailError, "none", "var(--success-color)", "none");
  }
  validateForm();
};

const handleFocusOutEmail = () => {
  if (validateEmail(email.value, emailRegEx)) {
    stylesToChange(email, emailError, "none", "var(--success-color)", "none");
  }
  if (!validateEmail(email.value, emailRegEx)) {
    email.style.border = "2px var(--main-cta-color) solid";
    emailError.style.display = "block";
  }
  validateForm();
};

const handleKeyUpMessage = () => {
  successMessage.style.display = "none";
  if (
    checkRequiredLength(message.value, "max", 500) &&
    checkRequiredLength(message.value, "min", 25)
  ) {
    message.style.border = "2px var(--success-color) solid";
    messageError.style.display = "none";
  }
  validateForm();
};
const handleFocusOutMessage = () => {
  if (
    checkRequiredLength(message.value, "max", 500) &&
    checkRequiredLength(message.value, "min", 25)
  ) {
    message.style.border = "2px var(--success-color) solid";
    messageError.style.display = "none";
  }
  if (
    !checkRequiredLength(message.value, "max", 500) ||
    !checkRequiredLength(message.value, "min", 25)
  ) {
    message.style.border = "2px var(--main-cta-color) solid";
    messageError.style.display = "block";
  }
  validateForm();
};

fullName.addEventListener("keyup", handleKeyUpName);
email.addEventListener("keyup", handleKeyUpEmail);
message.addEventListener("keyup", handleKeyUpMessage);
fullName.addEventListener("focus", handleKeyUpName);
email.addEventListener("focus", handleKeyUpEmail);
message.addEventListener("focus", handleKeyUpMessage);
fullName.addEventListener("focusout", handleFocusOutName);
email.addEventListener("focusout", handleFocusOutEmail);
message.addEventListener("focusout", handleFocusOutMessage);

const handleContactFormSubmit = async (e) => {
  e.preventDefault();

  submitButton.disabled = true;
  sending.style.display = "inline";
  const formData = e.target;

  const sendFormUrl = formData.action;
  const method = formData.method;
  const body = new FormData(formData);
  try {
    const response = await fetch(sendFormUrl, {
      method,
      body,
    });
    response.ok
      ? (contactForm.reset(),
        (sendSuccess.style.display = "flex"),
        (sendSuccess.scrollIntoView({behavior: "smooth"})),
        (sending.style.display = "none"))
      : (sendSuccess.innerHTML = "Message cannot be sent at this time");
  } catch (error) {
    sendSuccess.style.display = "flec"
    sendSuccess.innerHTML = "<p>Messaging not possible at this time please try again later</p>";
    sendSuccess.style.backgroundColor = "var(--main-cta-color)";
    console.log(error);
  }
};

contactForm.addEventListener("submit", handleContactFormSubmit, handleSubmit);
