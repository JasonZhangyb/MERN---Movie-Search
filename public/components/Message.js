export default class Message extends React.Component {
  render() {
    const message = this.props.value;
    const isPopUp = this.props.toggle !== undefined;

    if (isPopUp) {
      return /*#__PURE__*/React.createElement("div", {
        className: "container my-xl-5"
      }, /*#__PURE__*/React.createElement("div", {
        className: "alert alert-light justify-content-center",
        role: "alert"
      }, /*#__PURE__*/React.createElement("div", {
        className: "row justify-content-end"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "close mr-1",
        "aria-label": "Close",
        onClick: this.props.toggle
      }, /*#__PURE__*/React.createElement("span", {
        "aria-hidden": "true"
      }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
        className: "row mx-1"
      }, message.title)));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "alert alert-secondary justify-content-center",
        role: "alert"
      }, message));
    }
  }

}