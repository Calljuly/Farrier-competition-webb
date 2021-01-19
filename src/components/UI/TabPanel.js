import React from "react";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
      style={{ padding: 0 }}
    >
      {value === index && (
        <Box p={3} style={{width: '100%', padding: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
