import Message from "./Message.js";
import Review from "./Review.js";

export default class MovieReview extends React.Component {
    render() {
        const reviews = this.props.value;

        let component;
        if (reviews.length === 0) {
            component = <Message value="No reviews found on this movie..."/>
        } else {
            component = <Review value={reviews}/>
        }

        return(
            <div>
                {component}
            </div>
        );
    }
}