import CelebrityResult from "./CelebrityResult.js";
import Message from "./Message.js";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            isLoading: false,
            value: '',
            result: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    updateInput(event) {
        this.setState({value: event.target.value})
    }

    handleClick() {
        this.setState({isLoading: true});
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ url: this.state.value})
        };
        fetch('/celebrity', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({
                isClicked: true,
                isLoading: false,
                value: '',
                result : data
            }));
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <div className="container my-xl-auto">
                        <h1 className="jumbotron-heading">Movie Search</h1>
                        <p className="lead text-muted">
                            Search for celebrities and related movies
                        </p>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Image URL here..."
                                   value={this.state.value} onChange={this.updateInput}/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" id="search_button"
                                        onClick={this.handleClick}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isLoading ? <Message value={"Loading..."} /> : null}
                {this.state.isClicked ? <CelebrityResult value={this.state.result} /> : null}
            </div>
        );
    }
}