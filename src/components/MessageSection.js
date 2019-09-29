import React from "react";
import AzureTTSHandler from "../AzureTTSHandler";

import microphone from "../assets/microphone.png";
import send from "../assets/send.png";

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
          <div class="text-bar text-left">
            <div class="row justify-content-center">
              <div class="col-sm-1">
                <button type="button" id="startRecognizeButton">
                  <img src={microphone} alt="responsive-button" />
                </button>
              </div>
              <div class="col-sm-10">
                <div id="phraseDiv" placeholder="Type something here..." />
              </div>
              <div class="col-sm-1">
                <button type="button" id="send-btn" class="align-right">
                  <img src={send} alt="responsive-button" />
                </button>
              </div>
            </div>
          </div>
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
