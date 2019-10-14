import React from "react";

class MessageSection extends React.Component {
  render() {
    return (
      <section className="message-section">
        {/* <div className="h-75 container-fluid message-output"></div> */}
        <div id="warning">
          <h1 style={{ fontWeight: "500" }}>
            Speech Recognition Speech SDK not found
            (microsoft.cognitiveservices.speech.sdk.bundle.js missing).
          </h1>
        </div>
      </section>
    );
  }
}

export default MessageSection;
