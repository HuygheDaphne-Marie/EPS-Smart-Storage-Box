const Item = require('./Item');
const mysql = require('mysql');

class InventoryManager {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root', // Add user
      password: '', // Add password
      database : 'storagebox'
    })
    this.items = [];
    this.fetchItems(this.items);
  }

  fetchItems(items) {
    this.connection.connect()
    this.connection.query('SELECT * FROM item', (err, rows, fields) => {
      if (err) throw err
      rows.forEach(row => {
        items.push(new Item(row.id, row.name, row.stock))
      })
    })
    this.connection.end()
  };

  orderItem(UID, amount) {
    const itemOrdered = this.items.find(item => {
      return item.UID == UID;
    });

    try {
      itemOrdered.order(amount);
      return itemOrdered;
    } catch(err) {
      return {item: itemOrdered, err}
    }
  }

  RequestItems(request) {
    let orderStatus = {
      completed: [],
      failed: []
    };
    this._orderedItems = [];

    request.forEach(order => {
      const res = this.orderItem(order.UID, order.amount);
      if(res.err === undefined) {
        orderStatus.completed.push(res);
        this._orderedItems.push({
            amount: order.amount,
            item: res
        });
      } else {
        orderStatus.failed.push(res);
      }
    });

    return orderStatus;
  }
}

module.exports = new InventoryManager();