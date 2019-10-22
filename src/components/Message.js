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
        <div className="left messages">
          <div className="message">
            {this.message}
          </div>
        </div>
        
      );
    } else {
      return (
        <div className="right messages">
          <div className="message">
            {this.message}
          </div>
        </div>
        
      );
    }
  }
}

export default Message;
