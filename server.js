const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Inventory = require('./InventoryManger');
const SerialComms = require('./SerialComms');
const Box = require('./Box');
const Frame = require('./Frame');
// const serial = new SerialComms(process.argv[2]) 
const frame = new Frame([new Box(Inventory.items[0]), new Box(Inventory.items[1]), new Box(Inventory.items[2])]);

// Setup / Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('request-order', requestData => {
    // Check if order is OK & everything can be ordered
    let req = JSON.parse(requestData);
    const completedOrders = Inventory.RequestItems(req);
    socket.emit('item-update', completedOrders);

    // Receive from client they're taking an item out (along with the item name/ID)
    // => make that box blink

    // Receive from client they're done taking that item and are now taking another item..
    // rince and repeat!

    // serial.write(JSON.parse({type: 'BLINK', box: 2}))
  })

  socket.on('update-order', updateData => {
    const completedUpdate = Inventory.updateItem(updateData)
    if(completedUpdate !== undefined) {
      socket.emit('item-update', JSON.stringify(completedUpdate));
    }
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

if (typeof(serial) !== 'undefined') {
  serial.on('message', data => {
    switch(data.type) {
      case 'READY':
        console.log('Serial is ready...')
        // Send something back to the arduino so that it's loop can begin??? ==> might allow for no or less delay in the loop
        break;
      case 'SENSOR':
        const percentage = frame.calculatePercentages(data);
        console.log('GET SENSOR INFO', percentage)
        // Send data to arduino ==> is this even nececary if we won't use lights on them by default?
        // Send data to clients
        break;
      default:
        console.log('Unhandeled message:', data)
        break;
    }
  });
} else {
  console.log('WARN: Currently running without serial connection, some things might not work...')
}


// INIT
const PORT = process.env.PORT || 5000;
http.listen(PORT, function(){
  console.log(`Server started on port ${PORT}..`);
});

app.get('/', (req, res) => {
  let items = Inventory.items;
  res.render('index', {items});
});
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});
app.get('/assembly', (req, res) => {
    res.render('assembly', {items:Inventory.orderedItems});
});
app.get('/admin', (req, res) => {
  res.render('admin', {items:Inventory.items});
});
app.get('/sensor', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/sensor.html'))
});

