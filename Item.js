class Item {
  constructor(UID, name, stock) {
    this._UID= UID;
    this._name = name;
    this._stock = stock;
  }

  get UID() {
    return this._UID;
  }
  set UID(newUID) {
    this._UID = newUID;
  }

  get name() {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }

  get stock() {
    return this._stock;
  };
  set stock(newStock) {
    if(typeof newStock === "number" && newStock > 0 && newStock % 1 == 0) {
      this._stock = newStock;
    } else {
      throw 'Stock must be a positive whole number!!';
    }
  };

  toString() {
    return `${this.name} (${this.UID}) has ${this.stock} units in stock`;
  }

  order(amount) {
    if(this.stock - amount >= 0) {
      // Enough items in stock to fullfill order
      try {
        this.stock -= amount; // We try to change stock, will throw an error if changed by an incorrect value
        console.log(this.stock)
      } catch(err) {
        console.error(err); // tell user he tried to change stock by the wrong type of number
      }
    } else {
      // Not enough items left to fullfill order
      console.error('WEE WOO: Not enough stock!')
    }
  }

  restock(amount) {
    try {
      this.stock += amount; // We try to change stock, will throw an error if changed by an incorrect value
      console.log(this.stock);
    } catch(err) {
      console.log(err); // tell user he tried to change stock by the wrong type of number
    }
  }



}

module.exports = Item;