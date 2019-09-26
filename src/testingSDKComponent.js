import React from 'react'; 
import AzureTTSHandler from "./AzureTTSHandler";

class TestingSDKComponent extends React.Component {

  componentDidMount() {
    AzureTTSHandler.initializeVoiceRecognition("warning","content","phraseDiv","startRecognizeButton" );
  }

  render() {
    return (
        <div>
          <div id="warning">
            <h1 style={{fontWeight: "500"}}>Speech Recognition Speech SDK not found
              (microsoft.cognitiveservices.speech.sdk.bundle.js missing).</h1>
          </div>

          <div id="content" style={{"display": "none"}}>
            <table width="100%">
              <tr>
                <td></td>
                <td><h1 style={{fontWeight: "500"}}>Blue people voice to text</h1>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button id="startRecognizeButton">Start recognition</button>
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

export default TestingSDKComponent;
