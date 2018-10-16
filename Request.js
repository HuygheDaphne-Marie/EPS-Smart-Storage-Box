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
      let found = false;
      this._items.forEach(itemOrder => {
        if(itemOrder.item.UID === item.UID) {
          found = true;
          itemOrder.amount += amount;
        }
      });

      if(!found) {
        this._items.push({item, amount});
      }
    }
  }

  removeFromOrder(item, amount) {
    // item IS an Item, amount is eighter nothing or a positive whole number
    if(item instanceof Item && amount === undefined || typeof amount === "number" && amount > 0 && amount % 1 == 0) {
      for(let idx = 0; idx < this._items.length; idx++) {
        let itemOrder = this._items[idx];
        if(itemOrder.item.UID === item.UID) {
          if(amount === undefined) {
            this._items.splice(this._items.indexOf(itemOrder), 1);
          } else {
            if(itemOrder.amount - amount <= 0) {
              this._items.splice(this._items.indexOf(itemOrder), 1);
            } else {
              itemOrder.amount -= amount;
            }
          }
        }
      }  
    }
  }


}

module.exports = Request;