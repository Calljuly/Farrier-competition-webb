import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import ShoingClass from "../components/Tables/ShoingClass";
import ForgingClass from "../components/Tables/ForgingClass";
import AddCompetition from "../components/Forms/addCompetition";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import { Colors } from "../colors";
import CompetitionListItemAdmin from "../components/ListItems/CompetitionListItemAdmin";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Paper elevation={4} style={{ padding: 20 }}>
            {children}
          </Paper>
        </Box>
      )}
    </div>
  );
};

const useStyle = makeStyles({
  tabs: {
    width: 250,
    height: 100,
    textDecoration: "none",
    color: Colors.orange,
    backgroundColor: Colors.black,
    fontSize: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  active: {
    margin: 5,
    textDecoration: "none",
    color: "#101820FF",
    backgroundColor: "#F2AA4CFF",
    fontSize: 30,
    borderRadius: 10,
  },
});

const Admin = () => {
  const classes = useStyle();
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.auth.user);

  const compClasses = useSelector((state) => {
    return state.competitions.competitions;
  });
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleModalContent = (id, cell, title, index, compIndex) => {
    setModalData({
      id: id,
      cellId: cell,
      title: title,
      index: index,
      compIndex: compIndex,
    });
    setModal(true);
  };

  const adminCompetitions = compClasses.filter((item, index) => {
    if (item.admins.includes(user.name)) {
      return item;
    }
  });

  const closeModalHandler = (data) => {
    dispatch(
      actions.addPoint(
        data,
        modalData.id,
        modalData.cellId,
        modalData.index,
        modalData.compIndex,
        compClasses
      )
    );
    setModal(false);
  };
  const saveResults = () => {
    dispatch(actions.savePoints());
  };

  return (
    <>
      <h1>Admin</h1>

      <div>
        <CustomModal
          isOpen={modalopen}
          handleClose={closeModalHandler}
          modalData={modalData}
        />
        <Tabs
          TabIndicatorProps={{
            style: {
              height: "0px",
            },
          }}
          value={value}
          onChange={handleChange}
        >
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active, root: classes.tabs }}
            label="Information"
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="Add competition"
          />
          <Tab
            className={classes.tabs}
            classes={{ selected: classes.active }}
            label="My Competitions"
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <h1>Information</h1>
          <p>
            If you are authurized you can reach what your are authurized to do
            here.
            <br />
            To create a competition click on "New Competition" and fill in the
            form given to you. Remeber to fill a the inputs
            <br />
            If you have any ongoing competitions you can start adding scores to
            the score board
          </p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <h1>Add new competition</h1>
          <AddCompetition />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h1>My competitions</h1>
          {adminCompetitions.length !== 0 ? (
            adminCompetitions.map((item, index) => {
              return (
                <CompetitionListItemAdmin
                  key={item.name}
                  index={index}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  referee={item.referee}
                  country={item.country}
                  maxEntries={item.maxEntries}
                  current={item.currentEntries}
                  compClasses={item.classes}
                  disabled={item.maxEntries === item.currentEntries}
                />
              );
            })
          ) : (
            <p>No competitions to show</p>
          )}

          {compClasses.map((item, compIndex) => {
            if (item.admins.includes(user.name)) {
              return item.classes.map((classes, index) => {
                return classes.type === "Shoeing" ? (
                  <ShoingClass
                    key={index}
                    handleModalContent={handleModalContent}
                    saveResults={saveResults}
                    pointsToMultiply={classes.pointsToMultiply}
                    result={classes.unPublishedResult}
                    index={index}
                    compIndex={compIndex}
                  />
                ) : (
                  <ForgingClass
                    key={index}
                    handleModalContent={handleModalContent}
                    saveResults={saveResults}
                    pointsToMultiply={classes.pointsToMultiply}
                    result={classes.unPublishedResult}
                    index={index}
                    compIndex={compIndex}
                  />
                );
              });
            }
          })}
        </TabPanel>
      </div>
    </>
  );
};

export default Admin;
