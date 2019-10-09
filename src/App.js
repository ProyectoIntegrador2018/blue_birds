import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header class="header-bar">
          <div class="container-fluid">
            <h1 class="display-4">Let's Talk!</h1>
            <p class="lead">Translator API Explorer</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
