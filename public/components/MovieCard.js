import MoviePopup from "./MoviePopup.js";
export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      result: {}
    };
    this.handleClick = this.handleClick.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  handleClick(event) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: event.target.value
      })
    };
    fetch('/movie', requestOptions).then(response => response.json()).then(data => {
      const converted_data = convertData(data);
      converted_data.then(data => {
        this.setState({
          result: data,
          showPopup: true
        });
      });
    });
  }

  togglePopup() {
    this.setState({
      showPopup: false
    });
  }

  render() {
    const movie_list = this.props.value;
    return /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-center"
    }, movie_list.map(movie => /*#__PURE__*/React.createElement("div", {
      key: movie.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "card mx-1 my-1",
      style: {
        width: '18rem'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
      className: "card-img-top",
      alt: "Card image cap",
      onError: e => e.target.src = "/image/default-poster.jpg",
      style: {
        width: '286px',
        height: '429px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "card-title"
    }, movie.title), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      value: movie.id,
      onClick: this.handleClick
    }, "Details")))))), this.state.showPopup ? /*#__PURE__*/React.createElement(MoviePopup, {
      value: this.state.result,
      toggle: this.togglePopup,
      from: this.props.from,
      collection: this.props.collection
    }) : null);
  }

}

function convertData(data) {
  return new Promise(function (resolve, reject) {
    if (data.id !== 'failure') {
      let genres_str = "";

      for (let i = 0; i < data.genres.length; i++) {
        genres_str += data.genres[i].name;

        if (i !== data.genres.length - 1) {
          genres_str += ", ";
        }
      }

      data.genres = genres_str;
      resolve(data);
    } else {
      resolve(data);
    }
  });
}