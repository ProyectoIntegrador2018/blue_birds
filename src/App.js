import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import AzureTTSHandler from "./AzureTTSHandler";

import MessageSection from "./components/MessageSection";
import MessageBar from "./components/MessageBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.messageList = [];

    this.sendMessage = this.sendMessage.bind(this);
  }

  processMessage(message) {
    var lowerMessage = message.toLowerCase();
    const language = document.getElementsByName("language")[0].checked;
    console.log(lowerMessage, language);
  }

  sendMessage() {
    let phraseInput = document.getElementById("phraseInput");
    let message = phraseInput.value;
    if (message !== "") {
      this.processMessage(message);
      phraseInput.value = "";
      this.messageList.push({
        key: this.messageList.length,
        is_receiver: false,
        message: message
      });
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

    document.getElementsByName("language")[0].checked = true;

    AzureTTSHandler.initializeVoiceRecognition(
      "warning",
      "phraseInput",
      "startRecognizeButtonEnglish",
      "soundWave"
    );
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
