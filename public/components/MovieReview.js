import Message from "./Message.js";
import Review from "./Review.js";
export default class MovieReview extends React.Component {
  render() {
    const reviews = this.props.value;
    let component;

    if (reviews.length === 0) {
      component = /*#__PURE__*/React.createElement(Message, {
        value: "No reviews found on this movie..."
      });
    } else {
      component = /*#__PURE__*/React.createElement(Review, {
        value: reviews
      });
    }

    return /*#__PURE__*/React.createElement("div", null, component);
  }

}