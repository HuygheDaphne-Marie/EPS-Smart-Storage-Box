const Box = require('./Box');

class Frame {
  constructor(boxes) {
    this.boxes = boxes === undefined ? [] : boxes;
  }

  addBox(box) {
    if(box instanceof Box) {
      this.boxes.push(box);
    } else {
      throw "Frame boxes must be of the class Box!";
    }
  }

  removeBox(index) {
    this.boxes.splice(index, 1);
  }

  calculatePercentages(frameData) {
    const percentagesMessage = {
      type: 'PERCENT',
      boxes: []
    }
    this.boxes.forEach(box => {
      percentagesMessage.boxes.push(box.calculatePercentage(frameData.boxes[this.boxes.indexOf(box)]));
    });
    return percentagesMessage;
  }
}

module.exports = Frame;