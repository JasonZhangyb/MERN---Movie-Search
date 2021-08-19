export default class ProviderButton extends React.Component {
  render() {
    const messageFound = "Check Availability";
    const messageNotFound = "No Providers Found";

    if (this.props.value === '') {
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary mt-2 mb-4 mx-4"
      }, messageNotFound);
    } else {
      return /*#__PURE__*/React.createElement("a", {
        href: this.props.value,
        role: "button",
        target: "_blank",
        className: "btn btn-primary mt-2 mb-4 mx-4 active",
        "aria-pressed": "true"
      }, messageFound);
    }
  }

}