import AuthServices from "../services/AuthServices.js";
export default class CollectionButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    AuthServices.deleteMovie({
      _id: this.props.collection,
      movie_id: this.props.movie
    }).then(response => {
      alert(response.message.msgBody);
      window.location.reload();
    });
  }

  render() {
    if (this.props.from === undefined) {
      return /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary mt-4 mx-4",
        onClick: this.props.toggle
      }, "Add to collection");
    } else {
      return /*#__PURE__*/React.createElement("div", {
        className: "row justify-content-between mt-4 mx-4"
      }, /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary flex-fill mr-1",
        onClick: this.props.toggle
      }, "Add"), /*#__PURE__*/React.createElement("button", {
        type: "button",
        className: "btn btn-secondary flex-fill ml-1",
        onClick: this.handleDelete
      }, "Delete"));
    }
  }

}