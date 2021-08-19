export default class Review extends React.Component {
    render() {
        const reviews = this.props.value;
        return(
            <div className="container">
                {reviews.map((review) => (
                    <div className="row my-1 mr-2 border" key={review.id} style={{height: '100px'}}>
                        <div className="col-2">
                            <img src={"https://image.tmdb.org/t/p/w500" + review.author_details.avatar_path}
                                 onError={(e) => e.target.src = "/image/default-avatar.png"}
                                 alt="" className="rounded my-1" style={{width: '85px', height: '85px'}}/>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <p className="font-weight-bold mb-1">{review.author_details.username}</p>
                            </div>
                            <div className="row overflow-auto" style={{height: '70px'}}>
                                {review.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}