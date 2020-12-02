const mediumRegexPassword = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

export const validateEmail = (email) => {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(email)) {
    return false;
  }
  return true;
};

export const validPassword = (pass) => {
  if (pass === "") {
    return false;
  }
  if (pass.length < 8) {
    return false;
  }
  if (!mediumRegexPassword.test(pass)) {
    return false;
  }
  return true;
};
