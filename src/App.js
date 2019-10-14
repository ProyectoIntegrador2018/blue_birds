import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import AzureTTSHandler from "./AzureTTSHandler";

import MessageSection from "./components/MessageSection";
import MessageBar from "./components/MessageBar";

class App extends React.Component {
  componentDidMount() {
    AzureTTSHandler.initializeVoiceRecognition(
      "warning",
      "phraseInput",
      "startRecognizeButton"
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
          <MessageSection />
        </div>
        <MessageBar />
      </div>
    );
  }
}

export default App;
