import AuthServices from "../services/AuthServices.js"

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleLogin(event) {
        event.preventDefault();
        AuthServices.login(this.state).then(response => {
            if (response.isAuthenticated) {
                location.href='/';
            } else {
                alert("Unauthorized, please verify the login information");
            }
        });
    }

    render() {
        return(
            <div className="login text-center">
                <form className="form-signin" onSubmit={this.handleLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                           required autoFocus value={this.state.email} onChange={this.handleEmailChange}/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword2" className="form-control" placeholder="Password"
                           required value={this.state.password} onChange={this.handlePasswordChange}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        );
    }
}