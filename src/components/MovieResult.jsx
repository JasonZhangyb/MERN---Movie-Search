import MovieCard from './MovieCard.js'
import Message from './Message.js'

export default class MovieResult extends React.Component {
    render () {
        const movie_list = this.props.value;
        const message = "No movie was found based on this celebrity...";
        if (movie_list.length !== 0) {
            return <MovieCard value={movie_list} />
        } else {
            return <Message value={message} />
        }
    }
}