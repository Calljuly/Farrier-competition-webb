import React from "react";

class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div style={{ width: "100%", fontSize: 5 }}>{this.props.children}</div>
    );
  }
}
export default ComponentToPrint;
