const Item = require('./Item');

class Box {
  constructor(Item, serial) {
    this.itemHeld = Item;
    this.serial = serial;
  }

  switchItem(newItem) {
    if(newItem instanceof Item) {
      this.itemHeld = newItem;
    } else {
      throw "Box itemHeld must be of the class Item!";
    }
  }
}

module.exports = Box;