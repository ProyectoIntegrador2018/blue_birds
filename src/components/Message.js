import React from "react";

class Message extends React.Component {

  constructor(props) {
    super(props);
    this.is_receiver = props.is_receiver;
    this.message = props.message;
  }

  render() {
    if (this.is_receiver) {
      return (
        <div className="message received-message">
          {this.message}
        </div>
      );
    } else {
      return (
        <div className="message sent-message">
          {this.message}
        </div>
      );
    }
  }
}

export default Message;
