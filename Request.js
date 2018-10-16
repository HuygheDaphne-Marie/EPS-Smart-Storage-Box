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

  addToOrder(item, amount) {
    if(item instanceof Item && amount > 0) {
      this._items.push({Item, amount});
    }
  }

}

module.exports = Request;