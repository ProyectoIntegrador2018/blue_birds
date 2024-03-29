import React from "react";
import Message from "./Message";

class MessageSection extends React.Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  constructor(props) {
    super(props);
    if (!props.messageList) {
      this.messageList = [];
    } else {
      this.messageList = props.messageList;
    }
  }

  render() {
    return (
      <section className="messenger">
        {this.messageList.map((message, index) => (
          <Message
            key={message.key}
            is_receiver={message.is_receiver}
            message={message.message}
          />
        ))}
        {/* <div className="h-75 container-fluid message-output"></div> */}
        <div id="warning">
          <h1 style={{ fontWeight: "500" }}>
            Speech Recognition Speech SDK not found
            (microsoft.cognitiveservices.speech.sdk.bundle.js missing).
          </h1>
        </div>
        <div
          ref={el => {
            this.el = el;
          }}
        />
      </section>
    );
  }
}

export default MessageSection;
