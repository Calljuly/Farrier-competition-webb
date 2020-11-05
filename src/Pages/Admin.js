import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../components/Modal";
import * as actions from "../store/actions/resultAction";
import ShoingClass from "../components/Tables/ShoingClass";
import ForgingClass from "../components/Tables/ForgingClass";
import AddCompetition from "../components/Forms/addCompetition";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";

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
const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Admin = () => {
  const [modalopen, setModal] = useState(false);
  const [modalData, setModalData] = useState("");
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const compClasses = useSelector((state, index) => {
    return state.competitions.competitions.filter((item) => {
      return item.admins.includes(user.name) && user.name;
    });
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModalContent = (id, cell, title) => {
    setModalData({
      id: id,
      cellId: cell,
      title: title,
    });
    setModal(true);
  };
  const closeModalHandler = (data, id, cellId) => {
    dispatch(actions.addPoint(data, id, cellId));
    setModal(false);
  };
  const saveResults = () => {
    dispatch(actions.savePoints());
  };

  return (
    <div>
      <CustomModal
        isOpen={modalopen}
        handleClose={closeModalHandler}
        modalData={modalData}
      />
      <h1>Admin</h1>

      <Tabs value={value} onChange={handleChange}>
        <Tab label="Information" {...a11yProps(0)} />
        <Tab label="Add competition" {...a11yProps(1)} />
        <Tab label="Edit scores" {...a11yProps(2)} />
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
        <h1>Fill in results</h1>
        {compClasses.map((item) => {
          return item.classes.map((classes, index) => {
            return classes.type === "Shoeing" ? (
              <ShoingClass
                key={index}
                handleModalContent={handleModalContent}
                saveResults={saveResults}
                pointsToMultiply={classes.pointsToMultiply}
                result={classes.result}
              />
            ) : (
              <ForgingClass
                key={index}
                handleModalContent={handleModalContent}
                saveResults={saveResults}
                pointsToMultiply={classes.pointsToMultiply}
                result={classes.result}
              />
            );
          });
        })}
      </TabPanel>
    </div>
  );
};

export default Admin;
