import MovieDetail from "./MovieDetail.js";
import Message from "./Message.js";

export default class MoviePopup extends React.Component {
    render() {
        const data = this.props.value;
        return(
            <div className="pop-outer">
                {(data.id === 'failure') ?
                    <Message value={data} toggle={this.props.toggle}/> :
                    <MovieDetail value={data} toggle={this.props.toggle} from={this.props.from}
                                 collection={this.props.collection}/>}
            </div>
        );
    }
}