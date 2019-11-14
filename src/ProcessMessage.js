export default class ProcessMessage {
  constructor() {
    this.order = [];
    this.stackMessages = [];
    this.restaurants = [];
    this.total = 0;
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

  static englishDB = {
    "mcdonald's": {
      hamburger: 20,
      fries: 5
    },
    "burger king": {
      whopper: 50
    }
  };

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
        orderStr += `${index + 1}) Restaurante: ${order.restaurant} Cantidad: ${
          order.quantity
        } Platillo: ${order.food} Precio: $${order.price} `;
      } else {
        orderStr += `${index + 1}) Restaurant: ${order.restaurant} Quantity: ${
          order.quantity
        } Food: ${order.food} Price: $${order.price} `;
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

      var orderString = "Tu orden: \n";
      const { orderStr, total } = this.orderString("spanish");
      orderString += orderStr;
      orderString += `Total: $${total}`;

      if (this.total === total) {
        return "No encontré esos platillos en el restaurante que me dijiste.";
      } else {
        this.total = total;
        return orderString;
      }
    } else {
      this.stackMessages.push(message);
      return "Disculpa pero no pude procesar correctamente tu orden ya que no encontré el restaurante de donde deseas ordenar, me lo puedes mencionar?";
    }
  }

  matchEnglish(message) {
    if (this.stackMessages.length > 0) {
      var pastMessage = this.stackMessages.pop();
      pastMessage += ` ${message}`;
      return this.matchEnglish(pastMessage);
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

      var orderString = "Your order: \n";
      const { orderStr, total } = this.orderString("english");
      orderString += orderStr;
      orderString += `Total: $${total}`;

      if (this.total === total) {
        return "I didn't found those foods on the restaurant that you told me.";
      } else {
        this.total = total;
        return orderString;
      }
    } else {
      this.stackMessages.push(message);
      return "Sorry but I couldn't process your order correctly because I didn't found a restaurant in your order, could you mention it?";
    }
  }
}
