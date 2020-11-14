import React from "react";
import TextInput from "../TextInput";
import CustomSelect from "../Select";
import { string, func, shape, number, array, boolean } from "prop-types";

const AddClass = ({ label, handleClasses, compClasses, shoes, disabled }) => {
  return (
    <div>
      <h3>{label}</h3>
      <CustomSelect
        handler={handleClasses}
        label="type"
        id={"type"}
        classTypes={compClasses}
      />
      <CustomSelect
        handler={handleClasses}
        label="Shoe to Forge"
        id="shoeToForge"
        classTypes={shoes}
      />
      <CustomSelect
        handler={handleClasses}
        label="Shoe to Horse"
        id="shoeToHorse"
        classTypes={shoes}
        disabled={disabled}
      />
      <TextInput
        required
        id="time"
        label="Time"
        placeholder="time"
        onChange={(event) => handleClasses("time", event.target.value)}
      />
    </div>
  );
};
AddClass.propTypes = {
  label: string,
  handleClasses: func,
  compClasses: shape({
    type: string,
    value: string,
    headerTitles: array,
    description: string,
  }),
  shoes: shape({
    title: string,
    price: number,
    description: string,
    img: string,
  }),
  disabled: boolean,
};
export default AddClass;
