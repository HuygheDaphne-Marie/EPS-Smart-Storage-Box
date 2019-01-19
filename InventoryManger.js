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
    this._orderedItems = [];
    this.items = [];
    JSON.parse(fs.readFileSync('items.json', 'utf8')).forEach(itemdata => {
      this.items.push(new Item(itemdata.UID, itemdata.name, itemdata.stock));
    })
    // this.fetchItems(this.items);
  }

  get orderedItems(){
    return this._orderedItems;
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

  restockItem(UID, amount) {
    const itemOrdered = this.items.find(item => {
      return item.UID == UID;
    });

    try {
      itemOrdered.restock(amount);
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
        this._orderedItems.push({
          amount: order.amount,
          item: res
        });
      } else {
        orderStatus.failed.push(res);
      }
    });

    fs.writeFile('items.json', JSON.stringify(this.items), err => {
      if (err) throw err;
      console.log('Items has been saved!');
    })
    return orderStatus;
  }

  restockItems(restock) {
    let orderStatus = {
      completed: [],
      failed: []
    };

    restock.forEach(item => {
      const res = this.restockItem(item.UID, item.amount);
      if(res.err === undefined) {
        orderStatus.completed.push(res);
      } else {
        orderStatus.failed.push(res);
      }
    });

    fs.writeFile('items.json', JSON.stringify(this.items), err => {
      if (err) throw err;
      console.log('Items has been saved!');
    })
    return orderStatus;
  }
}

module.exports = new InventoryManager();