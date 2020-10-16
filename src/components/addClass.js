import React from "react";
import TextInput from "./TextInput";
import CustomSelect from "./Select";
import { string, func, shape, number, array, boolean, bool } from "prop-types";

const AddClass = ({ label, handleClasses, compClasses, shoes, disabled }) => {
  return (
    <div>
      <h3>{label}</h3>
      <CustomSelect
        handler={handleClasses}
        label="type"
        classTypes={compClasses}
      />
      <CustomSelect
        handler={handleClasses}
        label="Shoe to Forge"
        classTypes={shoes}
      />
      <CustomSelect
        handler={handleClasses}
        label="Shoe to Horse"
        classTypes={shoes}
        disabled={disabled}
      />
      <TextInput
        required
        key="time"
        label="Time"
        placeholder="time"
        onChange={(event) => handleClasses("time", event.target.value)}
      />

      {disabled
        ? compClasses[0].headerTitles.map((item) => {
            return (
              <TextInput
                required
                key={item}
                label={item}
                placeholder={item}
                onChange={(event) => handleClasses(item, event.target.value)}
              />
            );
          })
        : compClasses[1].headerTitles.map((item) => {
            return (
              <TextInput
                required
                key={item}
                label={item}
                placeholder={item}
                onChange={(event) => handleClasses(item, event.target.value)}
              />
            );
          })}
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
