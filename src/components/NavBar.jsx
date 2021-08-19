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
                this.setState({isLoggedIn: true});
            }
        });
    }

    handleLogOut() {
        AuthServices.logout().then(reponse => {
            if (reponse.success) {
                this.setState({isLoggedIn: false});
                location.href='/';
            }
        });
    }

    render() {
        return (
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container d-flex justify-content-between">
                    <a className="navbar-brand">MovieSearch</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link active">Home</Link>
                            {
                                this.state.isLoggedIn ?
                                <Link to="/collections" className="nav-item nav-link">MovieList</Link>
                                : null
                            }

                        </div>
                    </div>
                    <div className="navbar-nav">
                        {
                            this.state.isLoggedIn ?
                                <a className="nav-link" onClick={this.handleLogOut}>Logout</a> :
                                <Link to="/login" className="nav-item nav-link">Login</Link>
                        }
                        <Link to="/register" className="nav-item nav-link">Register</Link>
                    </div>
                </div>
            </div>
        );
    }
}

