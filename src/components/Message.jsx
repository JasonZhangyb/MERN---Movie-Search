export default class Message extends React.Component {
    render() {
        const message = this.props.value;
        const isPopUp = (this.props.toggle !== undefined);
        if (isPopUp) {
            return(
                <div className="container my-xl-5">
                    <div className="alert alert-light justify-content-center" role="alert">
                        <div className="row justify-content-end">
                            <button type="button" className="close mr-1" aria-label="Close" onClick={this.props.toggle}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="row mx-1">
                            {message.title}
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="container">
                    <div className="alert alert-secondary justify-content-center" role="alert">
                        {message}
                    </div>
                </div>
            );
        }
    }
}