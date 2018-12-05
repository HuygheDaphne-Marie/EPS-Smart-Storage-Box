const Item = require('./Item');
const Request = require('./Request');

class InventoryManager {
  constructor() {
    this.items = [
      new Item('R1', 'Red Smartie', 10),
      new Item('B1', 'Blue Smartie', 10),
      new Item('Y1', 'Yellow Smartie', 10),
      new Item('V1', 'Violet Smartie', 10),
      new Item('G1', 'Green Smartie', 10)
    ];

    this._orderedItems = [];
  }

  get orderedItems(){
    return this._orderedItems;
  }

  order(UID, amount) {
    const itemOrdered = this.items.find(item => {
      return item.UID === UID;
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
      const res = this.order(order.UID, order.amount);
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