import React from "react";
import SendButton from "./SendButton";
import Microphone from "./Microphone";

export default class MessageBar extends React.Component {
  

  render() {
    return (
      <div
        className="container-fluid text-bar text-left"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div className="row">
          <div className="col-sm-12">
            <div className="input-group">
              <div className="input-group-prepend">
                <Microphone />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder=""
                id="phraseInput"
              />
              <div className="input-group-append" id="button-addon4">
                <SendButton onClick={this.props.onClick}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
