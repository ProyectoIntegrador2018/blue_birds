import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import AzureSTTHandler from "./AzureSTTHandler";
import MessageSection from "./components/MessageSection";
import MessageBar from "./components/MessageBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.messageList = [];
    this.responseList = [
      "Hello",
      "Hello, can I take your order?",
      "Is that all?",
      "Your total is of 30 dollars",
      "You can pick up your food in the next window",
      "Thank you for your order",
      "Hope to see you back soon"
    ];

    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleMessage() {
    this.sendResponse();
  }

  sendMessage() {
    let phraseInput = document.getElementById("phraseInput");
    let message = phraseInput.value;
    phraseInput.value = "";
    this.messageList.push({
      key: this.messageList.length,
      is_receiver: false,
      message: message
    });
    this.forceUpdate();
  }

  sendResponse() {
    let rand = Math.floor(Math.random() * 6);
    this.messageList.push({
      key: this.messageList.length,
      is_receiver: true,
      message: this.responseList[rand]
    });
    this.forceUpdate();
  }

  componentDidMount() {
    AzureSTTHandler.initializeVoiceRecognition(
      "warning",
      "phraseInput",
      "startRecognizeButtonSpanish",
      "soundWave"
    );

    AzureSTTHandler.initializeVoiceRecognition(
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
        <MessageBar onClick={this.sendMessage} onClickOperator={this.handleMessage} />
      </div>
    );
  }
}

export default App;
