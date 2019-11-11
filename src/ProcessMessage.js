export default class ProcessMessage {
  constructor() {
    this.order = [];
    this.stackMessages = [];
    this.restaurants = [];
  }

  static spanishTextToNumbers = {
    uno: 1,
    una: 1,
    unas: 1,
    unos: 1,
    dos: 2,
    sin: 0
  };

  static spanishDB = {
    mcdonalds: {
      hamburguesa: 20,
      papas: 5
    },
    "burger king": {
      whopper: 50
    }
  };

  matchSpanish(message) {
    if (message === "cancelar orden") {
      this.order = [];
      return "Orden Cancelada";
    }
    const textToNumbers = ProcessMessage.spanishTextToNumbers;
    const wordArray = message.split(" ");
    for (const restaurante in ProcessMessage.spanishDB) {
      if (message.includes(restaurante)) {
        this.restaurants.push(restaurante);
      }
    }

    if (this.restaurants.length > 0) {
      while (this.restaurants.length > 0) {
        const restaurante = this.restaurants.pop();
        const element = ProcessMessage.spanishDB[restaurante];
        for (const food in element) {
          if (message.includes(food)) {
            var indexOf =
              wordArray.indexOf(food) > -1
                ? wordArray.indexOf(food)
                : wordArray.indexOf(food + "s");
            const quantity = Number.isNaN(parseInt(wordArray[indexOf - 1]))
              ? textToNumbers[wordArray[indexOf - 1]]
              : parseInt(wordArray[indexOf - 1]);
            this.order.push({
              restaurante: restaurante,
              platillo: food,
              cantidad: quantity,
              precio: element[food] * quantity
            });
          }
        }
      }
      this.order.sort((a, b) =>
        a.restaurante > b.restaurante
          ? 1
          : b.restaurante > a.restaurante
          ? -1
          : 0
      );

      var orderStr = "Tu orden: \n";
      var total = 0;
      this.order.forEach((order, index) => {
        orderStr += `${index + 1}) Restaurante: ${
          order.restaurante
        } Cantidad: ${order.cantidad} Platillo: ${order.platillo} Precio: $${
          order.precio
        } `;
        total += order.precio;
      });
      orderStr += `Total: $${total}`;
      return orderStr;
    } else {
      this.stackMessages.push(message);
      return "Disculpa pero no pude procesar correctamente tu orden ya que no encontré el restaurante de donde deseas ordenar, me lo puedes mencionar?";
    }
  }

  matchEnglish(message) {
    if (message.includes("hello")) {
      return "Hello, I am here to help you process your order, what would you be ordering today?";
    } else {
      return "Sorry but I am still learning, can you repeat that or explain it different?";
    }
  }
}
