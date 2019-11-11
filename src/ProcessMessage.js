export default class ProcessMessage {
  static spanishGreetingDB = ["hola"];

  constructor() {
    this.order = [];
  }

  matchSpanish(message) {
    if (message.includes("hola")) {
      return "Hola, soy un asistente para un procesamiento de ódenes, qué deseas ordenar el día de hoy?";
    } else {
      return "Disculpa pero estoy en proceso de aprender más palabras, lo puedes repetir o explicarme de una forma diferente?";
    }
    // console.log("spanish", message);
  }

  matchEnglish(message) {
    if (message.includes("hello")) {
      return "Hello, I am here to help you process your order, what would you be ordering today?";
    } else {
      return "Sorry but I am still learning, can you repeat that or explain it different?";
    }
    console.log("english", message);
  }
}
