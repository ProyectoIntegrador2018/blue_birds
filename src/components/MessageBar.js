import React from "react";
import SendButton from "./SendButton";
import Microphone from "./Microphone";
export default class MessageBar extends React.Component {
  render() {
    return (
      <div>
        <div class="text-bar text-left">
          <div class="row justify-content-center">
            <div class="col-sm-1">
              <Microphone />
            </div>
            <div class="col-sm-10">
              <div id="phraseDiv" placeholder="Type something here..." />
            </div>
            <div class="col-sm-1">
              <SendButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
