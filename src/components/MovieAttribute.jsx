export default class MovieAttribute extends React.Component {
    render() {
        return(
            <div className="row justify-content-start">
                <div className="col-2">
                    {this.props.attribute}
                </div>
                <div className="col-10">
                    {this.props.value}
                </div>
            </div>
        );
    }
}