import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import PageHeader from "../components/UI/PageHeader";
const useStyles = makeStyles({});

const ScorePicker = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const l = useLocation();
  const compClasses = l.state;
  const compIndex = l.id;

  const classes = useStyles();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 30,
        }}
      >
        <PageHeader>Pick scoresheet</PageHeader>
        <CustomButton onClick={() => history.goBack()} title="Go Back" />
      </div>
      <div className="divOrange" />
      <div className="divBlack" />
      <div>
        {compClasses.unPublishedResult.map((item, index) => {
          return (
            <>
              <p>Heat {item.heat}</p>
              <p
                onClick={() =>
                  history.push({
                    pathname: "/admin/scores",
                    state: compClasses,
                    id: compIndex,
                    heat: item.starts,
                    heatId: item.heat,
                    shoe: "shoeOne",
                  })
                }
              >
                Shoe One
              </p>
              <p
                onClick={() =>
                  history.push({
                    pathname: "/admin/scores",
                    state: compClasses,
                    id: compIndex,
                    heat: item.starts,
                    heatId: item.heat,
                    shoe: "shoeTwo",
                  })
                }
              >
                Shoe Two
              </p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ScorePicker;
