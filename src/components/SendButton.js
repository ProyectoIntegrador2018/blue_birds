import React from "react";
import send from "../assets/send.png";

export default function SendButton() {
  return (
    <button type="button" id="send-btn" class="align-right">
      <img src={send} alt="responsive-button" />
    </button>
  );
}
