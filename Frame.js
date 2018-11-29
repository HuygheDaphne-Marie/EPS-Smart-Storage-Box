const Box = require('./Box');

class Frame {
  constructor() {
    this.boxes = [];
  }

  addBox(box) {
    if(box instanceof Box) {
      this.boxes.push(box);
    } else {
      throw "Frame boxes must be of the class Box!";
    }
  }
}

module.exports = Frame;