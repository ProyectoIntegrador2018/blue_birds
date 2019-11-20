import React from "react";
import translateText from "../translate"

export default class TranslateToPicker extends React.Component {
  changeText(text) {
    let phraseInput = document.getElementById("phraseInput");
    phraseInput.value = text;
  }

  handleClick() {
    const language = this.props.language;
    if (language === 'en-US') {
      translateText('es-MX', this.changeText);
    } else {
      translateText('en-US', this.changeText);
    }
  }

  render() {

    return (
      <div className="dropdown">
        <button className="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" onClick={() => this.handleClick()} >
          Translate
        </button>
      </div>
    )
  }
}