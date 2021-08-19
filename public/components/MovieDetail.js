import MovieAttribute from "./MovieAttribute.js";
import CollectionButton from "./CollectionButton.js";
import ProviderButton from "./ProviderButton.js";
import MovieReview from "./MovieReview.js";
import CollectionPopup from "./CollectionPopup.js";
import AuthServices from "../services/AuthServices.js";
export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      isLoggedIn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    AuthServices.isAuthenticated().then(response => {
      if (response.isAuthenticated) {
        this.setState({
          isLoggedIn: true
        });
      } else {
        this.setState({
          isLoggedIn: false
        });
      }
    });
  }

  handleClick() {
    if (this.state.isLoggedIn) {
      this.setState({
        showPopup: !this.state.showPopup
      });
    } else {
      alert("Login is required for accessing collections");
    }
  }

  render() {
    const movie_detail = this.props.value;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
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
      className: "row my-2 justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "card border-0"
    }, /*#__PURE__*/React.createElement("img", {
      className: "card-img-top",
      src: "https://image.tmdb.org/t/p/w500" + movie_detail.poster_path,
      alt: "Card image cap",
      style: {
        width: '340px',
        height: '510px'
      }
    }), /*#__PURE__*/React.createElement(CollectionButton, {
      toggle: this.handleClick,
      from: this.props.from,
      collection: this.props.collection,
      movie: movie_detail.id
    }), /*#__PURE__*/React.createElement(ProviderButton, {
      value: movie_detail.provider
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row mt-2 justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("h2", null, movie_detail.title))), /*#__PURE__*/React.createElement("div", {
      className: "row mt-2 justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-3"
    }, "TMDB " + movie_detail.vote_avg + " (" + movie_detail.vote_count + ")")), /*#__PURE__*/React.createElement("div", {
      className: "row my-2 justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("div", {
      className: "overflow-auto",
      style: {
        height: '70px'
      }
    }, movie_detail.overview))), /*#__PURE__*/React.createElement(MovieAttribute, {
      attribute: 'Genre',
      value: movie_detail.genres
    }), /*#__PURE__*/React.createElement(MovieAttribute, {
      attribute: 'Date',
      value: movie_detail.release_date
    }), /*#__PURE__*/React.createElement(MovieAttribute, {
      attribute: 'length',
      value: movie_detail.runtime + "m"
    }), /*#__PURE__*/React.createElement("div", {
      className: "row mt-4 justify-content-start"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col"
    }, /*#__PURE__*/React.createElement("h4", null, "TMDB Reviews"))), /*#__PURE__*/React.createElement("div", {
      className: "overflow-auto",
      style: {
        height: '320px'
      }
    }, /*#__PURE__*/React.createElement(MovieReview, {
      value: movie_detail.reviews
    })))))), this.state.showPopup ? /*#__PURE__*/React.createElement(CollectionPopup, {
      movie_id: movie_detail.id,
      poster_path: movie_detail.poster_path,
      title: movie_detail.title,
      toggle: this.handleClick
    }) : null);
  }

}