export default class Review extends React.Component {
  render() {
    const reviews = this.props.value;
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, reviews.map(review => /*#__PURE__*/React.createElement("div", {
      className: "row my-1 mr-2 border",
      key: review.id,
      style: {
        height: '100px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-2"
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://image.tmdb.org/t/p/w500" + review.author_details.avatar_path,
      onError: e => e.target.src = "/image/default-avatar.png",
      alt: "",
      className: "rounded my-1",
      style: {
        width: '85px',
        height: '85px'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "col-10"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-weight-bold mb-1"
    }, review.author_details.username)), /*#__PURE__*/React.createElement("div", {
      className: "row overflow-auto",
      style: {
        height: '70px'
      }
    }, review.content)))));
  }

}