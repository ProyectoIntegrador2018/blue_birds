import React from "react";
import "css-toggle-switch/src/toggle-switch.scss";

const switchStyle = {
  width: "200px",
  margin: "auto",
  align: "center",
  background: "#c6cacc",
  color: "white",
  fontSize: "12px"
};

const buttonStyle = {
  background: "rgb(93, 182, 146)"
};

export default function LanguagePicker() {
  return (
    <div class="switch-toggle alert alert-light" style={switchStyle}>
      <input id="SPA" name="view" type="radio" value="SPA" checked></input>
      <label for="SPA" onClick="">
        Español
      </label>
      <input id="EN" name="view" value="EN" type="radio"></input>
      <label for="EN" onClick="">
        English
      </label>
      <a class="btn" style={buttonStyle}></a>
    </div>
  );
}
