import CelebrityCard from "./CelebrityCard.js";
import Message from './Message.js';
export default class CelebrityResult extends React.Component {
  render() {
    const response = this.props.value;

    if (response.id !== 'failure') {
      return /*#__PURE__*/React.createElement(CelebrityCard, {
        value: response
      });
    } else {
      return /*#__PURE__*/React.createElement(Message, {
        value: response.name
      });
    }
  }

}