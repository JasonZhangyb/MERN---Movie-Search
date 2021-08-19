import AuthServices from "../services/AuthServices.js";
const Link = ReactRouterDOM.Link;
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    AuthServices.isAuthenticated().then(response => {
      if (response.isAuthenticated) {
        this.setState({
          isLoggedIn: true
        });
      }
    });
  }

  handleLogOut() {
    AuthServices.logout().then(reponse => {
      if (reponse.success) {
        this.setState({
          isLoggedIn: false
        });
        location.href = '/';
      }
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "navbar navbar-expand-lg navbar-dark bg-dark"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container d-flex justify-content-between"
    }, /*#__PURE__*/React.createElement("a", {
      className: "navbar-brand"
    }, "MovieSearch"), /*#__PURE__*/React.createElement("div", {
      className: "collapse navbar-collapse",
      id: "navbarNavAltMarkup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "navbar-nav"
    }, /*#__PURE__*/React.createElement(Link, {
      to: "/",
      className: "nav-item nav-link active"
    }, "Home"), this.state.isLoggedIn ? /*#__PURE__*/React.createElement(Link, {
      to: "/collections",
      className: "nav-item nav-link"
    }, "MovieList") : null)), /*#__PURE__*/React.createElement("div", {
      className: "navbar-nav"
    }, this.state.isLoggedIn ? /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      onClick: this.handleLogOut
    }, "Logout") : /*#__PURE__*/React.createElement(Link, {
      to: "/login",
      className: "nav-item nav-link"
    }, "Login"), /*#__PURE__*/React.createElement(Link, {
      to: "/register",
      className: "nav-item nav-link"
    }, "Register"))));
  }

}