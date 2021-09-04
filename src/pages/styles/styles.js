import { Colors } from "../../colors";
import { makeStyles } from "@material-ui/styles";

export const aboutPage = makeStyles({
    card: {
        backgroundColor: "rgba(255,255,255, 0.8)",
        width: 600,
        height: "80%",
        position: "absolute",
        top: 50,
        left: 70,
        ["@media (max-width:1300px)"]: {
            position: "relative",
            top: 0,
            left: 0,
            width: "100%",
        },
    },
});

export const adminPage = makeStyles({
    imgContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
});

export const contactPageStyle = makeStyles({
    email: {
        textDecoration: "none",
        color: "black",
    },
    container: {
        width: "99%",
        padding: 20,
        marginTop: 10,
    },
    itemContainer: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        backgroundColor: Colors.black,
        color: Colors.orange,
        width: 200,
        padding: 10,
        margin: "10px 0px 10px 10px",
        ["@media (max-width:956px)"]: {
            width: "100%",
        },
    },
    input: {
        width: "96%",
        margin: 20,
    },
    disabled: {
        backgroundColor: "white",
        color: "#DCDCDC",
        width: 200,
        padding: 10,
        margin: "10px 0px 10px 10px",
        ["@media (max-width:956px)"]: {
            width: "97%",
            alignSelf: "center",
            margin: "10px 0px 10px 0px",
        },
    },
});

export const enterCompetitionPageStyle = makeStyles({
    table: {
        width: "95%",
        margin: "auto",
    },
    paragraf: {
        "-webkit-transform": "rotate(90deg)",
        "-moz-transform": "rotate(90deg)",
        "-ms-transform": "rotate(90deg)",
        "-o-transform": "rotate(90deg)",
        transform: "rotate(90deg)",
        display: "block",
        textAlign: "top",
        verticalAlign: "top",
        margin: "0px",
        padding: "0px",
        paddingTop: "10px",
        whiteSpace: "nowrap",
        transformOrigin: "left left 0",
        width: "100%",
        height: "100%",
    },
});

export const homePageStyle = makeStyles({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ["@media (max-width:1300px)"]: {
            display: "block",
        },
    },
    headerText: {
        color: Colors.orange,
        fontSize: 45,
        fontWeight: "bold",
        marginLeft: 60,
        ["@media (max-width:1300px)"]: {
            textAlign: "center",
            margin: 0,
            fontSize: 30,
        },
    },
    headerTextSec: {
        color: "white",
        fontSize: 30,
        margin: "40px 100px 40px 40px",
        ["@media (max-width:1300px)"]: {
            margin: 20,
            fontSize: 20,
            textAlign: "center",
        },
    },
    welcomeText: {
        color: Colors.orange,
        fontSize: 40,
        marginLeft: 60,
        ["@media (max-width:1300px)"]: {
            textAlign: "center",
            margin: 0,
        },
    },
    calendarContainer: {
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 40,
        paddingBottom: 40,
    },
    orangeLine: {
        backgroundColor: Colors.orange,
        width: "100%",
        height: "2px",
    },
    upcomingEvent: {
        width: "80%",
        marginTop: 40,
        fontSize: 40
    },
    upcomingEventContainer: {
        backgroundColor: "white",
        marginTop: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    homeBackground: {
        backgroundColor: Colors.black,
        width: "100%",
        overflow: "hidden",
    },
    img: {
        width: "100%",
    },
});

export const logInPageStyle = makeStyles({
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "80%",
        height: 50,
        fontSize: 20,
        margin: 10,
    },
    failedLogin: {
        color: "red",
        fontSize: 20,
        fontWeight: "bold",
    },
    logInContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    logInButtonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 17,
    },
    blackLine: {
        backgroundColor: Colors.black,
        width: "90%",
        margin: "auto",
        height: 2,
    },
    registerButtonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    background: {
        width: "50%",
        backgroundColor: "white",
    },
});

export const resultPageStyle = makeStyles({
    table: {
        width: "95%",
        margin: "auto",
    },
    paragraf: {
        "-webkit-transform": "rotate(90deg)",
        "-moz-transform": "rotate(90deg)",
        "-ms-transform": "rotate(90deg)",
        "-o-transform": "rotate(90deg)",
        transform: "rotate(90deg)",
        display: "block",
        textAlign: "top",
        verticalAlign: "top",
        margin: "0px",
        padding: "0px",
        paddingTop: "10px",
        whiteSpace: "nowrap",
        transformOrigin: "left left 0",
        width: "100%",
        height: "100%",
    },
    sponsorContainer: {
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "100%",
        marginBottom: 30,
        ["@media (max-width: 1000px)"]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
    contentContainer: {
        margin: 40,
        ["@media (max-width: 1000px)"]: {
            margin: 0,
        },
    },
    tableContainer: {
        width: "100%",
        marginTop: "20px"
    },
});

export const startListPageStyle = makeStyles({
    table: {
        width: "95%",
        margin: "auto",
    },
    paragraf: {
        "-webkit-transform": "rotate(90deg)",
        "-moz-transform": "rotate(90deg)",
        "-ms-transform": "rotate(90deg)",
        "-o-transform": "rotate(90deg)",
        transform: "rotate(90deg)",
        display: "block",
        textAlign: "top",
        verticalAlign: "top",
        margin: "0px",
        padding: "0px",
        paddingTop: "10px",
        whiteSpace: "nowrap",
        transformOrigin: "left left 0",
        width: "100%",
        height: "100%",
    },
    startListContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "start",
        margin: 30,
        marginBottom: 30,
    },
    tableCell: {
        verticalAlign: "bottom",
        padding: 0
    }
});

export const userPageStyle = makeStyles({
    avatar: {
      margin: 40,
      width: 400,
      height: 400,
      ["@media (max-width:1000px)"]: {
        width: "80%",
        height: "80%",
      },
    },
    root: {
      display: "flex",
      width: "100%",
      ["@media (max-width:1000px)"]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    container: {
      display: "flex",
      flexDirection: "column",
    },
    headContainer: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 20,
    },
    header: {
      display: "flex",
      alignItems: "center",
      ["@media (max-width:1000px)"]: {
        flexDirection: "column",
      },
    },
  });