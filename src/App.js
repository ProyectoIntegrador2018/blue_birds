import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import TestingSDKComponent from "./testingSDKComponent";
import "./App.css";
import microphone from "./assets/microphone.png";
import send from "./assets/send.png";

function App() {
  return (
    <div className="App">
      <header class="header-bar">
        <div class="container-fluid">
          <h1 class="display-4">Let's Talk!</h1>
          <p class="lead">Translator API Explorer</p>
        </div>
      </header>

      <section class="message-section">
        <div class="h-75 container-fluid message-output"></div>

        <div class="container-fluid">
          <div class="text-bar text-left">
            <button type="button" id="microphone-btn">
              <img src={microphone} alt="responsive-button" />
            </button>
            <input
              type="text"
              id="text-field"
              placeholder="Type something here..."
            />
            <button type="button" id="send-btn" class="align-right">
              <img src={send} alt="responsive-button" />
            </button>
          </div>
        </div>
      </section>
      <TestingSDKComponent />
    </div>
  );
}

export default App;
