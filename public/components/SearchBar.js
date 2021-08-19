import CelebrityResult from "./CelebrityResult.js";
import Message from "./Message.js";
export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isLoading: false,
      value: '',
      result: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleClick() {
    this.setState({
      isLoading: true
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: this.state.value
      })
    };
    fetch('/celebrity', requestOptions).then(response => response.json()).then(data => this.setState({
      isClicked: true,
      isLoading: false,
      value: '',
      result: data
    }));
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "jumbotron text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container my-xl-auto"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "jumbotron-heading"
    }, "Movie Search"), /*#__PURE__*/React.createElement("p", {
      className: "lead text-muted"
    }, "Search for celebrities and related movies"), /*#__PURE__*/React.createElement("div", {
      className: "input-group mb-3"
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Image URL here...",
      value: this.state.value,
      onChange: this.updateInput
    }), /*#__PURE__*/React.createElement("div", {
      className: "input-group-append"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-outline-secondary",
      type: "button",
      id: "search_button",
      onClick: this.handleClick
    }, "Search"))))), this.state.isLoading ? /*#__PURE__*/React.createElement(Message, {
      value: "Loading..."
    }) : null, this.state.isClicked ? /*#__PURE__*/React.createElement(CelebrityResult, {
      value: this.state.result
    }) : null);
  }

}