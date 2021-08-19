import AuthServices from "../services/AuthServices.js";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            confirm: ""
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.confirmPassword = this.confirmPassword.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleNameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    confirmPassword(event) {
        this.setState({confirm: event.target.value});
    }

    handleRegister(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirm) {
            alert("Passwords do not match");
        } else {
            const input = {
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            };
            AuthServices.register(input).then(response => {
                const message = response.message
                alert(message.msgBody);
            });
        }
    }

    render() {
        return(
            <div className="login text-center">
                <form className="form-signin" onSubmit={this.handleRegister}>
                    <h1 className="h3 mb-3 font-weight-normal">Register new user</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                           required autoFocus value={this.state.email} onChange={this.handleEmailChange}/>
                    <label htmlFor="inputName" className="sr-only">User name</label>
                    <input type="text" id="inputName" className="form-control" placeholder="User name"
                           required autoFocus value={this.state.username} onChange={this.handleNameChange}/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required value={this.state.password} onChange={this.handlePasswordChange}/>
                    <label htmlFor="confirmPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword2" className="form-control" placeholder="Confirm password"
                           required value={this.state.confirm} onChange={this.confirmPassword}/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </div>
        );
    }
}