import React from "react";
import { makeStyles } from "@material-ui/styles";
import { actionSub } from "../../store/actions";
import { useDispatch } from "react-redux";

const useStyle = makeStyles({
  container: {
    borderRadius: 20,
    border: "2px solid black",
    display: "flex",
    width: 600,
  },
  textContainer: {
    marginLeft: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  img: {
    width: 150,
    height: 150,
    margin: 10,
  },
  header: {
    margin: 0,
  },
  text: {
    margin: 0,
  },
  price: {
    margin: 0,
  },
});
export const ShoeItem = (props) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(actionSub(props.title))}
      className={classes.container}
    >
      <img className={classes.img} src={props.img} alt="Pic" />
      <div className={classes.textContainer}>
        <h1 className={classes.header}>{props.title}</h1>
        <h3 className={classes.price}>{props.price}</h3>
        <p className={classes.text}>{props.description}</p>
      </div>
    </div>
  );
};
