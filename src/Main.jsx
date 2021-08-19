import NavBar from "./components/NavBar.js";
import SearchBar from "./components/SearchBar.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Collections from "./components/Collections.js";
const Route = ReactRouterDOM.Route;
const HashRouter = ReactRouterDOM.HashRouter;

class Main extends React.Component {
    render() {
        return(
            <HashRouter>
                <div>
                    <NavBar />
                    <div>
                        <Route exact path="/" component={SearchBar} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/collections" component={Collections} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('content'));

