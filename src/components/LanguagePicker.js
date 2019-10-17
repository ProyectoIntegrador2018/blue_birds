import React from "react";
import "css-toggle-switch/src/toggle-switch.scss";

const switchStyle = {
  width: "60px",
  margin: "auto",
  align: "center",
  background: "#c6cacc",
  color: "white",
  fontSize: "12px",
  marginRight: "10px"
};

const buttonStyle = {
  background: "rgb(93, 182, 146)"
};

export default class LanguagePicker extends React.Component {
  changeLanguage(e) {
    if (e.target.value === "es-MX") {
      document.getElementById("startRecognizeButtonEnglish").style.display =
        "none";
      document.getElementById("startRecognizeButtonSpanish").style.display =
        "block";
    } else {
      document.getElementById("startRecognizeButtonEnglish").style.display =
        "block";
      document.getElementById("startRecognizeButtonSpanish").style.display =
        "none";
    }
  }

  render() {
    return (
      <div className="switch-toggle alert alert-light" style={switchStyle}>
        <input
          id="ES"
          name="language"
          type="radio"
          value="es-MX"
          onChange={e => this.changeLanguage(e)}
        />
        <label htmlFor="ES">ES</label>
        <input
          id="EN"
          name="language"
          value="en-US"
          type="radio"
          onChange={e => this.changeLanguage(e)}
        />
        <label htmlFor="EN">EN</label>
        <a className="btn" style={buttonStyle} href="#"></a>
      </div>
    );
  }
}
