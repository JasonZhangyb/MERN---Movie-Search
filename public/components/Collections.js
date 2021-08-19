import CollectionRow from "./CollectionRow.js";
import AuthServices from "../services/AuthServices.js";
export default class Collections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    AuthServices.getCollections().then(response => {
      this.setState({
        data: response
      });
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "jumbotron text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container my-xl-auto"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "jumbotron-heading"
    }, "Welcome " + (this.state.data !== "" ? this.state.data.username : "")), /*#__PURE__*/React.createElement("p", {
      className: "lead text-muted"
    }, "Your own movie collections"))), this.state.data !== "" ? /*#__PURE__*/React.createElement(CollectionRow, {
      value: this.state.data.collections
    }) : null);
  }

}