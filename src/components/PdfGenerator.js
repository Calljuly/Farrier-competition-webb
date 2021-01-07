import React from "react";

class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div style={{ width: "96%", fontSize: 10 }}>{this.props.children}</div>
    );
  }
}
export default ComponentToPrint;
