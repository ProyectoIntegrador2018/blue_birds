import React from "react";
import operator from "../assets/operator.png";

export default class SendButton extends React.Component {
    render() {
        return (
            <button type="button" id="operator-btn" value="operator" onClick={this.props.onClickOperator}>
                <img src={operator} alt="responsive-button" style={{ width: "20px" }} />
            </button>
        );
    }
}
