import MovieDetail from "./MovieDetail.js";
import Message from "./Message.js";
export default class MoviePopup extends React.Component {
  render() {
    const data = this.props.value;
    return /*#__PURE__*/React.createElement("div", {
      className: "pop-outer"
    }, data.id === 'failure' ? /*#__PURE__*/React.createElement(Message, {
      value: data,
      toggle: this.props.toggle
    }) : /*#__PURE__*/React.createElement(MovieDetail, {
      value: data,
      toggle: this.props.toggle,
      from: this.props.from,
      collection: this.props.collection
    }));
  }

}