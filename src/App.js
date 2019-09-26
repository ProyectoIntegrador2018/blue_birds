import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import microphone from './assets/microphone.png';
import send from './assets/send.png';

import './App.css';

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
        <div class="h-75 container-fluid message-output">
          
        </div>

        <div class="container-fluid">
          <div class="text-bar">
            <div class="row">
              <div class="col-1">
                <button type="button" id="microphone-btn">
                  <img src={microphone} alt="responsive-button"/>
                </button>
              </div>
              <div class="col-10 text-left">
                <input type="text" id="text-field" placeholder="Type something here..."/>
              </div>
              <div class="col-1">
                <button type="button" id="send-btn">
                  <img src={send} alt="responsive-button"/>
                </button>
              </div>
            </div>
           
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default App;
