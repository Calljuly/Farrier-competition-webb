const mediumRegexPassword = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);
let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var reqPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

let valid = true;

export const validateEmail = (email, handleChange, key) => {
  valid = true;
  if (email.trim() === "") {
    valid = false;
  }
  if (!regEmail.test(email)) {
    valid = false;
  }
  handleChange(key, valid);
};

export const validatePassword = (pass, handleChange, key) => {
  valid = true;
  if (pass.trim() === "") {
    valid = false;
  }
  if (pass.length < 8) {
    valid = false;
  }
  if (!mediumRegexPassword.test(pass)) {
    valid = false;
  }
  handleChange(key, valid);
};

export const validateText = (text, handleChange, key) => {
  valid = true;
  if (text.trim() === "") {
    valid = false;
  }
  if (text.length < 5) {
    valid = false;
  }

  handleChange(key, valid);
};

export const validateAge = (input, handleChange, key) => {
  valid = true;
  if (key === "phone") {
    if (input.trim() === "") {
      valid = false;
    }
    if (input.length < 5) {
      valid = false;
    }
  } else {
    if (input === 0 || input === "" || !input) {
      valid = false;
    }
    if (input > 99) {
      valid = false;
    }
    if (input < 15) {
      valid = false;
    }
  }
  handleChange(key, valid);
};
