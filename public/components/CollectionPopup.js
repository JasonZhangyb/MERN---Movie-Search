import AuthServices from "../services/AuthServices.js";
export default class CollectionPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collection_name: ""
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateInput(event) {
    this.setState({
      collection_name: event.target.value
    });
  }

  handleClick() {
    AuthServices.addCollection({
      name: this.state.collection_name,
      movies: [{
        id: this.props.movie_id,
        poster_path: this.props.poster_path,
        title: this.props.title
      }]
    }).then(response => {
      alert(response.message.msgBody);
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "container my-xl-5 bg-white text-dark"
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
      className: "container"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-group mb-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Collection name",
      value: this.state.collection_name,
      onChange: this.updateInput
    }), /*#__PURE__*/React.createElement("div", {
      className: "input-group-append"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-outline-secondary",
      type: "button",
      onClick: this.handleClick
    }, "Submit")))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }));
  }

}