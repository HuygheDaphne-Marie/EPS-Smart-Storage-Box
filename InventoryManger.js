const Item = require('./Item');
const Request = require('./Request');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Add user
  password: '', // Add password
  database : 'storagebox'
})

class InventoryManager {
  constructor() {
    this.items = [];
    this.fetchItems(this.items);
  }

  fetchItems(items) {
    connection.connect()
    connection.query('SELECT * FROM item', (err, rows, fields) => {
      if (err) throw err
      rows.forEach(row => {
        items.push(new Item(row.id, row.name, row.stock))
      })
    })
    connection.end()
  }

  order(UID, amount) {
    const itemOrdered = this.items.find(item => {
      return item.UID === UID;
    })

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
      const res = this.order(order.UID, order.amount);
      if(res.err === undefined) {
        orderStatus.completed.push(res);
      } else {
        orderStatus.failed.push(res);
      }
    });
    return orderStatus;
  }

  test() {
  console.log(i1.toString());
  i1.order('500bbb');
  i1.order('500');
  i1.order(500.25)
  i1.order(500)
  i1.order(0.25)
  i1.order(5.0)
  i1.order(5)

  console.log('\nOrdering')
  i1.restock('bla');
  i1.restock('500c');
  i1.restock('500');
  i1.restock(0.50);
  i1.restock(1.0);
  i1.restock(10);

  console.log('\nRequesting')
  const r1 = new Request('REEE')
  r1.addToOrder(i1, 15);
  r1.addToOrder(i2, 5);
  console.log(r1.items);
  r1.removeFromOrder(i1, 2);
  r1.removeFromOrder(i2, 2);
  console.log('\n', r1.items);
  r1.removeFromOrder(i1, 20);
  console.log('\n', r1.items);
  r1.addToOrder(i2, 20);
  console.log('\n', r1.items);

  let item = r1._findItemOrder(i2)
  item.amount += 500
  console.log(r1.items)
  }
}

module.exports = new InventoryManager();