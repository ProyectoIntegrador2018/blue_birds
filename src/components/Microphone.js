import React from "react";
import microphone from "../assets/microphone.png";

export default function Microphone() {
  return (
    <button type="button" id="startRecognizeButton">
      <img src={microphone} alt="responsive-button" />
    </button>
  );
}
