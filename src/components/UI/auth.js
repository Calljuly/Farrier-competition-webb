import { useDispatch } from "react-redux";
import { auth } from "../firebase";

const a = ()=>{
    const dispatch = useDispatch();
    
    export const signIn = (email, pass) => {
        setIsLoading(true);
        auth
          .signInWithEmailAndPassword(email, pass)
          .then((cred) => {
            console.log("Sign in " + cred);
            if (cred) {
              setIsAuth(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            setIsLoggedIn(true);
            setIsAuth(false);
          });
      };
      
      export const logOut = () => {
        auth.signOut().then((cred) => {
          console.log("Sign out " + cred);
          setIsAuth(false);
        });
      };
      
      export const checkUserState = () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            //LoadData
          } else {
            console.log("User logged out");
          }
        });
      };
      
    
    return ();
}