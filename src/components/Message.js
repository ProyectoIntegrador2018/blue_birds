import React from "react";

class Message extends React.Component {

  constructor(props) {
    super(props);
    this.is_receiver = props.is_receiver;
    this.message = props.message;
    this.clase = ''
  }

  render() {
    
     if(this.is_receiver) {
       this.clase = 'left messages';
     } else {
       this.clase = 'right messages';
     }

     return (
       <div class={this.clase}>
        <div class="message">
             <p>{this.message}</p>
         </div>
       </div>
    );
  }
}

export default Message;
