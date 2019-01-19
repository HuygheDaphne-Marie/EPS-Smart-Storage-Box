const Item = require('./Item');
// const mysql = require('mysql');
const fs = require('fs');

class InventoryManager {
  constructor() {
    // this.connection = mysql.createConnection({
    //   host: 'localhost',
    //   user: 'root', // Add user
    //   password: '', // Add password
    //   database : 'storagebox'
    // })
    this.items = [];
    JSON.parse(fs.readFileSync('items.json', 'utf8')).forEach(itemdata => {
      this.items.push(new Item(itemdata.id, itemdata.name, itemdata.stock));
    })
    // this.fetchItems(this.items);
  }

  // fetchItems(items) {
  //   this.connection.connect()
  //   this.connection.query('SELECT * FROM item', (err, rows, fields) => {
  //     if (err) throw err
  //     rows.forEach(row => {
  //       items.push(new Item(row.id, row.name, row.stock))
  //     })
  //   })
  //   this.connection.end()
  // };

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

    request.forEach(order => {
      const res = this.orderItem(order.UID, order.amount);
      if(res.err === undefined) {
        orderStatus.completed.push(res);
      } else {
        orderStatus.failed.push(res);
      }
    });

    return orderStatus;
  }
}

module.exports = new InventoryManager();