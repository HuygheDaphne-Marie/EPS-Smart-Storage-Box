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

  boxWithItem(UID) {
    let boxIdx = -1;
    for(let i = 0; i < this.boxes.length; i++) {
      if(boxes[i].itemHeld.UID == UID) {
        boxIdx = i;
      }
    }
    return boxIdx;
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