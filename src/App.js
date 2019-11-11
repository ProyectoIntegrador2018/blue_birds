import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import AzureTTSHandler from "./AzureTTSHandler";
import ProcessMessage from "./ProcessMessage";

import MessageSection from "./components/MessageSection";
import MessageBar from "./components/MessageBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processor: new ProcessMessage()
    };
    this.messageList = [];

    this.sendMessage = this.sendMessage.bind(this);
  }

  processMessage(message) {
    var lowerMessage = message.toLowerCase();
    const language = document.getElementsByName("language")[0].checked;
    const response = language
      ? this.state.processor.matchSpanish(lowerMessage)
      : this.state.processor.matchEnglish(lowerMessage);
    this.messageList.push({
      key: this.messageList.length,
      is_receiver: true,
      message: response
    });
  }

  sendMessage() {
    let phraseInput = document.getElementById("phraseInput");
    let message = phraseInput.value;
    if (message !== "") {
      phraseInput.value = "";
      this.messageList.push({
        key: this.messageList.length,
        is_receiver: false,
        message: message
      });
      this.processMessage(message);
      this.forceUpdate();
    }
  }

  componentDidMount() {
    AzureTTSHandler.initializeVoiceRecognition(
      "warning",
      "phraseInput",
      "startRecognizeButtonSpanish",
      "soundWave"
    );

    AzureTTSHandler.initializeVoiceRecognition(
      "warning",
      "phraseInput",
      "startRecognizeButtonEnglish",
      "soundWave"
    );

    document.getElementsByName("language")[0].checked = true;
  }

  render() {
    return (
      <div className="App">
        <div id="content-wrap">
          <header className="header-bar">
            <div className="container-fluid">
              <h1 className="display-4">Let's Talk!</h1>
              <p className="lead">Translator API Explorer</p>
            </div>
          </header>
          <MessageSection messageList={this.messageList} />
        </div>
        <MessageBar onClick={this.sendMessage} />
      </div>
    );
  }
}

export default App;
