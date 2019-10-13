import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";

import MessageSection from "./components/MessageSection";
import LanguagePicker from "./components/LanguagePicker";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="header-bar">
          <div className="container-fluid">
            <h1 className="display-4">Let's Talk!</h1>
            <p className="lead">Translator API Explorer</p>
            <LanguagePicker />
          </div>
        </header>
        <MessageSection />
      </div>
    );
  }
}

export default App;
