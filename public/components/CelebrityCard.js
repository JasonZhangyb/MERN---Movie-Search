import MovieResult from "./MovieResult.js";
export default class CelebrityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      movies: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const celeb_list = this.props.value;

    for (let i = 0; i < celeb_list.length; i++) {
      const celeb = celeb_list[i];

      if (event.target.value === celeb.name) {
        this.setState({
          movies: celeb.known_for,
          isClicked: true
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(this.props.value) !== JSON.stringify(prevProps.value)) {
      this.setState({
        isClicked: false,
        movies: []
      });
    }
  }

  render() {
    const celeb_list = this.props.value;
    return /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-center"
    }, celeb_list.map(celeb => /*#__PURE__*/React.createElement("div", {
      className: "card mx-1 my-1",
      key: celeb.id,
      style: {
        width: '18rem'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "https://image.tmdb.org/t/p/w500" + celeb.profile_path,
      className: "card-img-top",
      alt: "Card image cap",
      onError: e => e.target.src = "/image/default-profile.png",
      style: {
        width: '286px',
        height: '429px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "card-body"
    }, /*#__PURE__*/React.createElement("h5", {
      className: "card-title"
    }, celeb.name), /*#__PURE__*/React.createElement("p", {
      className: "card-text"
    }, celeb.prob), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      value: celeb.name,
      onClick: this.handleClick
    }, "Confirm"))))), this.state.isClicked ? /*#__PURE__*/React.createElement(MovieResult, {
      value: this.state.movies
    }) : null);
  }

}