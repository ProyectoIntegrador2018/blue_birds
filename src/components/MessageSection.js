import React from "react";
import AzureTTSHandler from "../AzureTTSHandler";
import MessageBar from "./MessageBar";

class MessageSection extends React.Component {
  componentDidMount() {
    AzureTTSHandler.initializeVoiceRecognition(
      "warning",
      "phraseDiv",
      "startRecognizeButton"
    );
  }
  render() {
    return (
      <section class="message-section">
        {/* <div class="h-75 container-fluid message-output"></div> */}

        <div
          class="container-fluid"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <MessageBar />
        </div>
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
