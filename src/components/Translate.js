import React from "react";
import translateText from "../translate"
import translate from "../assets/translate.png"

const btnStyle = {
  width: "65px",
  margin: "auto",
  marginLeft: "-13px",
  marginRight: "-10px"
}

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
      <div>
        <button className="btn" style={btnStyle} type="button" id="dropdownMenuButton" data-toggle="dropdown" onClick={() => this.handleClick()} >
          <img src={translate} alt="responsive-button" />
        </button>
      </div>
    )
  }
}