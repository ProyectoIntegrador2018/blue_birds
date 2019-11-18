import React from "react";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.is_receiver = props.is_receiver;
    this.message = props.message;
    this.clase = "";
  }

  render() {
    if (this.is_receiver) {
      this.clase = "left messages";
    } else {
      this.clase = "right messages";
    }

    return (
      <div className={this.clase}>
        <div className="message">
          <p>{ ReactHtmlParser(this.message) }</p>
        </div>
      </div>
    );
  }
}

export default Message;
