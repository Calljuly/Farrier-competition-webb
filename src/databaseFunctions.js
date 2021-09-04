import { auth } from "./components/UI/firebase";

export const resetEmail = () => {
  auth
    .sendPasswordResetEmail(() => {
      console.log("Message sent to your mail");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const resetPassword = (email) => {
    auth
      .sendPasswordResetEmail(email).then(() => {
        console.log("Message sent to your mail");
      })
      .catch((error) => {
        console.log(error);
      });
  };
