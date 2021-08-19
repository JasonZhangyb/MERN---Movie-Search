import MovieAttribute from "./MovieAttribute.js";
import CollectionButton from "./CollectionButton.js";
import ProviderButton from "./ProviderButton.js";
import MovieReview from "./MovieReview.js";
import CollectionPopup from "./CollectionPopup.js";

import AuthServices from "../services/AuthServices.js";

export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            isLoggedIn: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        AuthServices.isAuthenticated().then(response => {
            if (response.isAuthenticated) {
                this.setState({isLoggedIn: true});
            } else {
                this.setState({isLoggedIn: false});
            }
        });
    }

    handleClick() {
        if (this.state.isLoggedIn) {
            this.setState({showPopup: !this.state.showPopup});
        } else {
            alert("Login is required for accessing collections");
        }

    }

    render() {
        const movie_detail = this.props.value;
        return(
            <div>
                <div className="container my-xl-5 bg-white text-dark">
                    <div className="row justify-content-end">
                        <button type="button" className="close mr-1" aria-label="Close" onClick={this.props.toggle}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="container">
                        <div className="row my-2 justify-content-start">
                            <div className="col-4">
                                <div className="card border-0">
                                    <img className="card-img-top"
                                         src={"https://image.tmdb.org/t/p/w500" + movie_detail.poster_path}
                                         alt="Card image cap" style={{width: '340px', height: '510px'}}/>
                                    <CollectionButton toggle={this.handleClick} from={this.props.from}
                                                      collection={this.props.collection} movie={movie_detail.id}/>
                                    <ProviderButton value={movie_detail.provider} />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="row mt-2 justify-content-start">
                                    <div className="col">
                                        <h2>{movie_detail.title}</h2>
                                    </div>
                                </div>
                                <div className="row mt-2 justify-content-start">
                                    <div className="col-3">
                                        {"TMDB " + movie_detail.vote_avg + " (" + movie_detail.vote_count + ")"}
                                    </div>
                                </div>
                                <div className="row my-2 justify-content-start">
                                    <div className="col">
                                        <div className="overflow-auto" style={{height:'70px'}}>
                                            {movie_detail.overview}
                                        </div>
                                    </div>
                                </div>
                                <MovieAttribute attribute={'Genre'} value={movie_detail.genres}/>
                                <MovieAttribute attribute={'Date'} value={movie_detail.release_date}/>
                                <MovieAttribute attribute={'length'} value={movie_detail.runtime + "m"}/>
                                <div className="row mt-4 justify-content-start">
                                    <div className="col">
                                        <h4>TMDB Reviews</h4>
                                    </div>
                                </div>
                                <div className="overflow-auto" style={{height: '320px'}}>
                                    <MovieReview value={movie_detail.reviews}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ?
                    <CollectionPopup movie_id={movie_detail.id} poster_path={movie_detail.poster_path}
                                     title={movie_detail.title} toggle={this.handleClick}/> : null}
            </div>
        );
    }
}