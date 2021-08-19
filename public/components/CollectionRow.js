import MovieCard from "./MovieCard.js";
import AuthServices from "../services/AuthServices.js";
export default class CollectionRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      collection_id: "",
      movies: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(collection_id, event) {
    this.setState({
      collection_id: collection_id,
      movies: this.props.value[event.target.value].movies
    }, () => {
      this.setState({
        expand: !this.state.expand
      });
    });
  }

  handleDelete(event) {
    AuthServices.deleteCollection({
      _id: event.target.value
    }).then(response => {
      alert(response.message.msgBody);
      window.location.reload();
    });
  }

  render() {
    const collections = this.props.value;
    return /*#__PURE__*/React.createElement("div", {
      className: "container"
    }, collections.map((collection, index) => /*#__PURE__*/React.createElement("div", {
      key: collection._id
    }, /*#__PURE__*/React.createElement("div", {
      className: "container mb-3 border bg-light"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-between ml-1 my-2"
    }, /*#__PURE__*/React.createElement("h3", null, collection.name), /*#__PURE__*/React.createElement("div", {
      className: "d-flex"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-secondary",
      value: collection._id,
      onClick: this.handleDelete
    }, "Delete")), /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      value: index,
      onClick: this.handleClick.bind(this, collection._id)
    }, "Expand")))), /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-start ml-2 mt-2 mb-3"
    }, collection.movies.slice(0, 5).map(movie => /*#__PURE__*/React.createElement("div", {
      className: "d-flex",
      key: movie.id
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      className: "card-img-top mr-1",
      alt: "Card image cap",
      onError: e => e.target.src = "/image/default-poster.jpg",
      style: {
        width: '210px',
        height: '300px'
      }
    }))))), this.state.expand && this.state.collection_id === collection._id ? /*#__PURE__*/React.createElement(MovieCard, {
      value: this.state.movies,
      from: "collection",
      collection: this.state.collection_id
    }) : null)));
  }

}