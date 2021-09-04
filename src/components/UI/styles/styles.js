import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "../../../colors";

export const buttonContainerStyle = makeStyles({
    container: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        ["@media (max-width:956px)"]: {
            flexDirection: "column",
        },
    },
});

export const errorPageStyle = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});

export const layoutStyle = makeStyles({
    contentContainer: {
        backgroundColor: "#FFFFFF",
        paddingBottom: 20,
    },
});

export const pageHeaderStyle = makeStyles({
    header: {
        color: Colors.black,
        padding: 20,
        margin: 0,
        fontFamily: "Kohinoor Telugu",
        fontSize: 30,
        ["@media (max-width:956px)"]: {
            fontSize: 20,
        },
    },
});

export const pStyle = makeStyles({
    p: {
        fontSize: "20px",
        color: Colors.black,
        fontFamily: "Kohinoor Telugu",
        margin: 5,
        ["@media (max-width:956px)"]: {
            fontSize: 15,
        },
    },
    orange: {
        fontSize: "20px",
        color: Colors.orange,
        ["@media (max-width:956px)"]: {
            fontSize: 15,
        },
    },
});

export const subHeaderStyle = makeStyles({
    header: {
        color: Colors.black,
        padding: 20,
        margin: 0,
        fontFamily: "Kohinoor Telugu",
        fontSize: 20,
        ["@media (max-width:956px)"]: {
            fontSize: 15,
        },
    },
});

export const tabsStyle = makeStyles({
    tabs: {
        minWidth: 120,
        height: 40,
        textDecoration: "none",
        color: Colors.black,
        fontSize: 10,
        margin: 5,
        padding: 5,
        ["@media (max-width:900px)"]: {
            width: 300,
            margin: 10,
        },
    },
    active: {
        minWidth: 120,
        minHeight: 30,
        margin: 5,
        marginBottom: 0,
        textDecoration: "none",
        color: "#101820FF",
        backgroundColor: "#F2AA4CFF",
        fontSize: 10,
        borderRadius: 3,
        padding: 5,
        ["@media (max-width:900px)"]: {
            margin: 10,
        },
    },
});

export const topPagesHeaderStyle = makeStyles({
    headerContainer: {
        display: "flex",
        alignItems: "center",
        ["@media (max-width:1000px)"]: {
            flexDirection: "column",
            alignItems: "center",
        },
    },
});

export const choiseModalStyle = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: "40%",
        boxShadow: theme.shadows[5],
        backgroundColor: "white",
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflow: "scroll",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        ["@media (max-width:1200px)"]: {
            width: "60%",
        },
        ["@media (max-width:800px)"]: {
            width: "90%",
        },
    },
}));

export const coockieConsentStyle = makeStyles({
    container: {
        position: "fixed",
        bottom: 0,
        backgroundColor: "black",
        opacity: 0.6,
        color: "white",
        width: "100%",
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ["@media (max-width:1253px)"]: {
            flexDirection: "column",
            alignItems: "start",
        },
        "& > p ": {
            margin: 20,
            textDecoration: "none",
            color: "white",
            "& > a": {
                textDecoration: "none",
                color: "white",
                margin: "0px 10px 0px 10px",
                "&:hover": {
                    color: "white",
                },
            },
        },
        "& > button": {
            margin: 20,
            backgroundColor: "white",
            color: "black",
            border: "none",
            padding: 10,
        },
    },
});

export const customButtonStyle = makeStyles({
    button: {
        backgroundColor: Colors.black,
        color: Colors.orange,
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

export const filterControllerStyle = makeStyles({
    container: {
        width: "100%",
        objectFit: "cover",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #DCDCDC",
        margin: "auto",
        padding: 20,
        ["@media (max-width: 1000px)"]: {
            height: "auto",
        },
    },
    contentContainer: {
        width: "80%",
        margin: "auto",
        backgroundColor: "#FFFFFF",
        padding: "30px 0px 30px 0px",
        ["@media (max-width: 1000px)"]: {
            width: "100%",
            padding: 0,
        },
    },
    radio: {
        "&$checked": {
            color: "blue",
        },
    },
    checked: { color: "green" },
});

export const footerStyle = makeStyles({
    container: {
        width: "100%",
        height: 300,
        backgroundColor: Colors.black,
        ["@media (max-width:1400px)"]: {
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            aligntItems: "center",
        },
    },
    text: {
        color: Colors.orange,
    },
    email: {
        textDecoration: "none",
        color: Colors.orange,
        fontSize: 20,
    },
    itemContainer: {
        color: Colors.orange,
        fontSize: 20,
        display: "flex",
        flexDirection: "row",
        ["@media (max-width:956px)"]: {
            width: "100%",
        },
    },
    gridItem: {
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column",
        padding: 30,
        ["@media (max-width:956px)"]: {
            width: "100%",
        },
    },
    icon: {
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 0,
        margin: 5,
        fontSize: 30,
    },
    button: {
        backgroundColor: Colors.orange,
        color: Colors.black,
        width: 200,
        padding: 10,
        margin: "10px 0px 10px 10px",
        ["@media (max-width:956px)"]: {
            width: "95%",
            margin: 10,
        },
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        padding: 10,
        width: "100%",
        ["@media (max-width:956px)"]: {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
    },
});

export const homeButtonStyle = makeStyles({
    container: {
        width: "90%",
        height: "90%",
        backgroundColor: "#101820FF",
        color: "#F2AA4CFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "opacity 1s",
        borderRadius: 10,
        textDecoration: "none",
        padding: 20,
        margin: 10,
        "&:hover": {
            opacity: "0.6",
        },
        "&> h1": {
            margin: 20,
            fontSize: 40,
        },
        "&> p": {
            fontSize: "20px",
        },
    },
});

export const isLoadingStyle = makeStyles({
    container: {
        boxShadow: " 0px 2px 20px rgba(0, 0, 0, 0.07)",
        borderRadius: 10,
        border: ` 1px solid ${Colors.orange}`,
        backgroundColor: Colors.black,
        color: Colors.orange,
        width: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 10,
    },
    paragraph: {
        color: Colors.orange,
        margin: 10,
        fontSize: 20
    },
});

export const modalStyle = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: "white",
        boxShadow: theme.shadows[5],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },

    modalContent: {
        backgroundColor: "white",
        width: "80%",
        height: 300,
        alignSelf: "center",
    },
}));

export const navbarStyle = makeStyles({
    avatar: {
        width: 100,
        height: 100,
    },
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#101820FF",
        flexDirection: "row",
        ["@media (max-width:1200px)"]: {
            justifyContent: "flex-start",
        },
    },
    logo: {
        width: "15%",
        alignSelf: "center",
        margin: 10,
    },
    welcomeContainer: {
        display: "flex",
        flexDirection: "row",
        background: "white",
        flex: 0.9,
        margin: 10,
        padding: 20,
        "&>h1": {
            marginLeft: 20,
        },
    },
    link: {
        width: 170,
        height: 40,
        margin: 20,
        textDecoration: "none",
        color: Colors.orange,
        fontSize: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,

        "&:hover": {
            color: "#101820FF",
            backgroundColor: "#F2AA4CFF",
            borderRadius: 5,
        },
    },
    activeLink: {
        margin: 20,
        padding: 10,
        textDecoration: "none",
        color: "#101820FF",
        backgroundColor: "#F2AA4CFF",
        fontSize: 20,
        borderRadius: 5,
        "&:hover": {
            color: "white",
        },
    },

    contentContainer: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        ["@media (max-width:1200px)"]: {
            display: "none",
        },
    },
    menuIcon: {
        fontSize: 40,
        color: Colors.orange,
    },
    menuIconContainer: {
        display: "none",
        ["@media (max-width:1200px)"]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 20,
        },
    },
});

export const selectStyle = makeStyles((theme) => ({
    formControl: {
        margin: 0,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    "&.makeStyles-formControl-42": {
        margin: 0,
    },
    select: {
        "&:before": {
            margin: 0,
            borderBottom: `1px solid ${Colors.black}`,
        },
        "&:after": {
            borderBottom: `1px solid ${Colors.orange}`,
        },
        "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
            borderBottom: `1px solid ${Colors.orange}`,
        },
    },
}));

export const sponsorCardStyle = makeStyles({
    card: {
        display: "flex",
        flexDirection: "column",
        width: 301,
        border: "1px solid #DCDCDC",
        margin: 20,
        ["@media (max-width:956px)"]: {
            width: "95%",
            margin: 10,
        },
    },
});

export const validationModalStyle = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        display: "flex",
        justifyContent: "cenetr",
        alignItems: "center",
        flexDirection: "column",
    },

    modalContent: {
        backgroundColor: "white",
        width: "80%",
        height: 300,
        alignSelf: "center",
    },
}));