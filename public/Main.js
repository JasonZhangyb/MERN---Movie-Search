import NavBar from "./components/NavBar.js";
import SearchBar from "./components/SearchBar.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Collections from "./components/Collections.js";
const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;

class Main extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(HashRouter, null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Route, {
      exact: true,
      path: "/",
      component: SearchBar
    }), /*#__PURE__*/React.createElement(Route, {
      path: "/login",
      component: Login
    }), /*#__PURE__*/React.createElement(Route, {
      path: "/register",
      component: Register
    }), /*#__PURE__*/React.createElement(Route, {
      path: "/collections",
      component: Collections
    }))));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById('content'));