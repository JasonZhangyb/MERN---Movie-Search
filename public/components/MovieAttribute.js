export default class MovieAttribute extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-2"
    }, this.props.attribute), /*#__PURE__*/React.createElement("div", {
      className: "col-10"
    }, this.props.value));
  }

}