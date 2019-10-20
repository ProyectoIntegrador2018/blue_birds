import React, { Component } from "react";
import microphone from "../assets/microphone.png";

export default class Microphone extends Component {
  render() {
    return (
      <div>
        <button type="button" id="startRecognizeButtonSpanish">
          <img src={microphone} alt="responsive-button" />
        </button>
        <button
          style={{ display: "none" }}
          type="button"
          id="startRecognizeButtonEnglish"
        >
          <img src={microphone} alt="responsive-button" />
        </button>
      </div>
    );
  }
}
