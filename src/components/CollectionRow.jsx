import MovieCard from "./MovieCard.js";
import AuthServices from "../services/AuthServices.js";

export default class CollectionRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            collection_id: "",
            movies: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleClick(collection_id, event) {
        this.setState({
            collection_id: collection_id,
            movies: this.props.value[event.target.value].movies
        }, () => {
            this.setState({expand: !this.state.expand});
        });
    }

    handleDelete(event) {
        AuthServices.deleteCollection({_id: event.target.value}).then((response) => {
           alert(response.message.msgBody);
           window.location.reload();
        });
    }

    render() {
        const collections = this.props.value;
        return (
            <div className="container">
                {collections.map((collection, index) => (
                    <div key={collection._id}>
                        <div className="container mb-3 border bg-light">
                            <div className="row justify-content-between ml-1 my-2">
                                <h3>{collection.name}</h3>
                                <div className="d-flex">
                                    <div className="col">
                                        <button type="button" className="btn btn-secondary"
                                                value={collection._id} onClick={this.handleDelete}>Delete</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-primary"
                                                value={index}
                                                onClick={this.handleClick.bind(this, collection._id)}>Expand</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-start ml-2 mt-2 mb-3">
                                {collection.movies.slice(0, 5).map((movie) => (
                                    <div className="d-flex" key={movie.id}>
                                        <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                                             className="card-img-top mr-1" alt="Card image cap"
                                             onError={(e) => e.target.src = "/image/default-poster.jpg"}
                                             style={{width:'210px', height:'300px'}}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {this.state.expand && (this.state.collection_id === collection._id) ?
                            <MovieCard value={this.state.movies} from={"collection"}
                                       collection={this.state.collection_id}/> : null}
                    </div>
                ))}
            </div>
        );
    }
}

