import React from "react";
import send from "../assets/send.png";

export default class SendButton extends React.Component {
  render() {
    return (
      <button type="button" id="send-btn" className="align-right" onClick={this.props.onClick}>
        <img src={send} alt="responsive-button" />
      </button>
    );
  }
}
