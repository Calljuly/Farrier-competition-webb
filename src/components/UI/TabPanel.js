import React from "react";
import Box from "@material-ui/core/Box";

const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ padding: 0 }}
      {...props}
    >
      {value === index && (
        <Box p={3} style={{ padding: 0 }} {...props}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
