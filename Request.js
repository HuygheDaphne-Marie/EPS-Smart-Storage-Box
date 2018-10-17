const Item = require('./Item');

class Request {
  constructor(orderer) {
    this._orderer = orderer;
    this._items = [];
  }

  get orderer() {
    return this._orderer;
  }
  set orderer(newOrderer) {
    console.log('Not allowed for now..');
  }

  get items() {
    return this._items
  }
  set items(newItemList) {
    console.log('Not allowed for now..');
  }

  _findItemOrder(item) {
    let itemFound = null;
    this.items.find(itemOrder => {
      if(itemOrder.item === item) { itemFound = itemOrder };
    });
    return itemFound;
  }

  addToOrder(item, amount) {
    if(item instanceof Item && amount > 0) {
      const itemAlreadyInOrder = this._findItemOrder(item);
      if(itemAlreadyInOrder !== null) {
        itemAlreadyInOrder.amount += amount;
      } else {
        this.items.push({item, amount});
      }
    }
  }

  removeFromOrder(item, amount) {
    if(item instanceof Item && amount === undefined || typeof amount === "number" && amount > 0 && amount % 1 == 0) {
      const itemToChange = this._findItemOrder(item);
      if(itemToChange !== null) {
        if(amount === undefined || itemToChange.amount - amount <= 0) {
          this._items.splice(this._items.indexOf(itemToChange), 1);
        } else {
          itemToChange.amount -= amount;
        }
      }
    }
  }
}

module.exports = Request;