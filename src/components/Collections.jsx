import CollectionRow from "./CollectionRow.js";
import AuthServices from "../services/AuthServices.js";

export default class Collections extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        }
    }

    componentDidMount() {
        AuthServices.getCollections().then(response => {
            this.setState({data: response});
        });
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <div className="container my-xl-auto">
                        <h1 className="jumbotron-heading">
                            {"Welcome " + (this.state.data !== "" ? this.state.data.username : "")}
                        </h1>
                        <p className="lead text-muted">
                            Your own movie collections
                        </p>
                    </div>
                </div>
                {this.state.data !== "" ? <CollectionRow value={this.state.data.collections}/> : null}
            </div>
        );
    }
}