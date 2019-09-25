import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {



  render() {
    return (
        <div className="App">
          <div id="warning">
            <h1 style={{fontWeight: "500"}}>Speech Recognition Speech SDK not found
              (microsoft.cognitiveservices.speech.sdk.bundle.js missing).</h1>
          </div>

          <div id="content" style={{"display": "none"}}>
            <table width="100%">
              <tr>
                <td></td>
                <td><h1 style={{fontWeight: "500"}}>Microsoft Cognitive Services Speech SDK JavaScript Quickstart</h1>
                </td>
              </tr>
              <tr>
                <td align="right"><a
                    href="https://docs.microsoft.com/azure/cognitive-services/speech-service/get-started"
                    target="_blank">Subscription</a>:
                </td>
                <td><input id="subscriptionKey" type="text" size="40" value={"1531213b900747749596e8d20221c1b4"} /></td>
              </tr>
              <tr>
                <td align="right">Region</td>
                <td><input id="serviceRegion" type="text" size="40" value={"SouthCentralUS"}/></td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button id="startRecognizeOnceAsyncButton">Start recognition</button>
                </td>
              </tr>
              <tr>
                <td align="right" valign="top">Results</td>
                <td><div id="phraseDiv" style={{"display": "inline-block", width: "500px", height: "200px"}}/></td>
              </tr>
            </table>
          </div>
        </div>
    );
  }
}

export default App;
