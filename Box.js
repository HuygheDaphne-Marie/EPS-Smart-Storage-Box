const Item = require('./Item');

class Box {
  constructor(Item) {
    this.itemHeld = Item;
    this._low;
    this._high;
  }

  switchItem(newItem) {
    if(newItem instanceof Item) {
      this.itemHeld = newItem;
    } else {
      throw "Box itemHeld must be of the class Item!";
    }
  }

  _scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  calculatePercentage(sensorValue) {
    const percentage = scale(sensorValue, low, high, 0, 100);
    if(isNaN(percentage)) return "Uncalibrated Low/High";
    return percentage;
  }
}

module.exports = Box;