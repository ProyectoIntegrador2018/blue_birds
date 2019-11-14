import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import AzureSTTHandler from "./AzureSTTHandler";
import ProcessMessage from "./ProcessMessage";
import MessageSection from "./components/MessageSection";
import MessageBar from "./components/MessageBar";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processor: new ProcessMessage()
    };
    this.messageList = [
      {
        key: 0,
        is_receiver: true,
        message:
          "Hola, soy un asistente para un procesamiento de órdenes, qué deseas ordenar el día de hoy? Para cancelar la orden favor de decir 'Cancelar orden'"
      }
    ];
    
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
    this.pushMessageToList = this.pushMessageToList.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  pushMessageToList(message) {
    this.messageList.push({
      key: this.messageList.length,
      is_receiver: true,
      message
    });
    this.forceUpdate();
  }

  handleMessage() {
    this.sendResponse();
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

    document.getElementsByName("language")[0].checked = true;

    document.getElementsByName("language")[0].addEventListener("click", () => {
      this.pushMessageToList(
        "Hola, soy un asistente para un procesamiento de órdenes, qué deseas ordenar el día de hoy? Para cancelar la orden favor de decir 'Cancelar orden'"
      );
    });

    document.getElementsByName("language")[1].addEventListener("click", () => {
      this.pushMessageToList(
        "Hello, I am here to help you process your order, what would you be ordering today? To cancel your order please say 'Cancel order'"
      );
    });
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
