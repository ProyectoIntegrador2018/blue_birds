import React from "react";
import SendButton from "./SendButton";
import Microphone from "./Microphone";
import LanguagePicker from "./LanguagePicker";
import wave from "../assets/soundwave.gif";

const waveStyle = {
  display: "none",
  borderRadius: "17px",
  border: "0px",
  width: "150px",
  height: "35px",
  margin: "auto"
};

export default class MessageBar extends React.Component {
  render() {
    return (
      <div className="container-fluid text-bar text-left" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="row">
          <div className="col-sm-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <Microphone />
              </div>
              <div className="input-group-prepend">
                <LanguagePicker />
              </div>
              <input type="text" className="form-control" placeholder="" id="phraseInput" />
              <img src={wave} alt="sound_wave" style={waveStyle} id="soundWave" />
              <div className="input-group-append" id="button-addon4">
                <SendButton onClick={this.props.onClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
