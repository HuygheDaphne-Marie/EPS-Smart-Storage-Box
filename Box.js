const Item = require('./Item');
const SerialComms = require('./SerialComms');

class Box {
  constructor(Item) {
    this.itemHeld = Item;
    this.serial = new SerialComms(process.argv[2]);
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