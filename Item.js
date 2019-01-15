class Item {
    constructor(UID, name, stock) {
        this._UID = UID;
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
        if (typeof newStock === "number" && newStock >= 0 && newStock % 1 == 0) {
            this._stock = newStock;
        } else {
            throw 'Stock must be a positive whole number!!';
        }
    };

    toString() {
        return `${this.name} (${this.UID}) has ${this.stock} units in stock`;
    }

    toJSON() {
        return {
            name: this._name,
            UID: this._UID,
            stock: this._stock
        };
    }

    order(amount) {
        if (this.stock - amount >= 0) {
            // Enough items in stock to fullfill order
            try {
                this.stock -= amount; // We try to change stock, will throw an error if changed by an incorrect value
            } catch (err) {
                throw 'ALERT: Ordered stock number is not valid! (Stock must be changed by a whole positive number)'; // Tell user he tried to change stock by the wrong type of number
            }
        } else {
            throw 'ALERT: You ordered more parts than we have on stock!'; // Not enough items left to fullfill order
        }
    }

    restock(amount) {
        try {
            this.stock += amount; // We try to change stock, will throw an error if changed by an incorrect value
        } catch (err) {
            console.log(err); // tell user he tried to change stock by the wrong type of number
        }
    }


}

module.exports = Item;