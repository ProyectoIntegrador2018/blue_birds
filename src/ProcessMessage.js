export default class ProcessMessage {
  constructor() {
    this.order = [];
    this.stackMessages = [];
    this.restaurants = [];
    this.total = 0;
  }

  static spanishTextToNumbers = {
    un: 1,
    uno: 1,
    una: 1,
    unas: 1,
    unos: 1,
    dos: 2,
    sin: 0
  };

  static spanishDB = require("./spanishDB.json");
  static englishDB = require("./englishDB.json");

  pushRestaurants(dataBase, message) {
    for (const restaurant in dataBase) {
      if (message.includes(restaurant)) {
        this.restaurants.push(restaurant);
      }
    }
  }

  sortOrder() {
    this.order.sort((a, b) =>
      a.restaurant > b.restaurant ? 1 : b.restaurant > a.restaurant ? -1 : 0
    );
  }

  wordIndexOf(wordArray, food) {
    return wordArray.indexOf(food) > -1
      ? wordArray.indexOf(food)
      : wordArray.indexOf(food + "s");
  }

  orderString(language) {
    var total = 0;
    var orderStr = "";
    this.order.forEach((order, index) => {
      if (language === "spanish") {
        orderStr += `<span class=oscuro>${index + 1}) Restaurante: </span> ${
          order.restaurant
        },<br><span class=oscuro> Cantidad: </span> ${
          order.quantity
        },<br><span class=oscuro> Platillo: </span> ${
          order.food
        },<br><span class=oscuro> Precio: </span>$${order.price}<br>`;
      } else {
        orderStr += `<span class=oscuro>${index + 1}) Restaurant: </span>${
          order.restaurant
        },<br><span class=oscuro> Quantity: </span>${
          order.quantity
        },<br><span class=oscuro> Food: </span>${
          order.food
        },<br><span class=oscuro> Price:</span>$${order.price}<br>`;
      }
      total += order.price;
    });
    return { orderStr, total };
  }

  matchSpanish(message) {
    if (this.stackMessages.length > 0) {
      var pastMessage = this.stackMessages.pop();
      pastMessage += ` ${message}`;
      return this.matchSpanish(pastMessage);
    }

    if (message === "cancelar orden") {
      this.order = [];
      return "Orden Cancelada";
    }

    if (message === "listo" && this.order.length > 0) {
      this.order = [];
      return "Procesaremos tu orden en un momento, gracias por confiar en nosotros.";
    }

    const textToNumbers = ProcessMessage.spanishTextToNumbers;
    const wordArray = message.split(" ");
    this.pushRestaurants(ProcessMessage.spanishDB, message);

    if (this.restaurants.length > 0) {
      while (this.restaurants.length > 0) {
        const restaurante = this.restaurants.pop();
        const element = ProcessMessage.spanishDB[restaurante];
        for (const food in element) {
          if (message.includes(food)) {
            var indexOf = this.wordIndexOf(wordArray, food);
            const checkNum = parseInt(wordArray[indexOf - 1], 10);
            const quantity = Number.isNaN(checkNum)
              ? textToNumbers[wordArray[indexOf - 1]]
              : checkNum;
            this.order.push({
              restaurant: restaurante,
              food,
              quantity,
              price: element[food] * quantity
            });
          }
        }
      }

      this.sortOrder();

      var orderString = "<span class=oscuro>Tu orden: </span> <br> ";
      const { orderStr, total } = this.orderString("spanish");
      orderString += orderStr;
      orderString += `<br><span class=oscuro>Total: </span> $${total},`;
      orderString += "<br> Si tu orden esta lista favor de decir 'Listo'.";

      if (this.total === total) {
        return "No encontré esos platillos en el restaurante que me dijiste.";
      } else {
        this.total = total;
        return orderString;
      }
    } else {
      this.stackMessages.push(message);
      return "Disculpa pero no pude procesar correctamente tu orden <br> ya que no encontré el restaurante de donde deseas ordenar, <br> me lo puedes mencionar?";
    }
  }

  matchEnglish(message) {
    if (this.stackMessages.length > 0) {
      var pastMessage = this.stackMessages.pop();
      pastMessage += ` ${message}`;
      return this.matchEnglish(pastMessage);
    }

    if (message === "ready" && this.order.length > 0) {
      this.order = [];
      return "We will process your order in a moment, thanks!";
    }

    if (message === "cancel order") {
      this.order = [];
      return "Order Canceled";
    }
    const wordArray = message.split(" ");
    this.pushRestaurants(ProcessMessage.englishDB, message);

    if (this.restaurants.length > 0) {
      while (this.restaurants.length > 0) {
        const restaurant = this.restaurants.pop();
        const element = ProcessMessage.englishDB[restaurant];
        for (const food in element) {
          if (message.includes(food)) {
            var indexOf = this.wordIndexOf(wordArray, food);
            const quantity = parseInt(wordArray[indexOf - 1], 10);
            this.order.push({
              restaurant,
              food,
              quantity,
              price: element[food] * quantity
            });
          }
        }
      }

      this.sortOrder();

      var orderString = "<span class=oscuro> Your order: </span><br>";
      const { orderStr, total } = this.orderString("english");
      orderString += orderStr;
      orderString += `<span class=oscuro>Total: </span>$${total},`;
      orderString += "<br> If your order is ready please say 'Ready'.";

      if (this.total === total) {
        return "I didn't find those meals on the restaurant you mentioned.";
      } else {
        this.total = total;
        return orderString;
      }
    } else {
      this.stackMessages.push(message);
      return "Sorry but I couldn't process your order correctly because I didn't find a restaurant in your order, could you mention it?";
    }
  }
}
