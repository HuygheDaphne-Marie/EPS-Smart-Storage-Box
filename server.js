const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Inventory = require('./InventoryManger');
const SerialComms = require('./SerialComms');
const Box = require('./Box');
const Frame = require('./Frame');
//const serial = new SerialComms(process.argv[2]) 
const frame = new Frame([new Box(Inventory.items[0]), new Box(Inventory.items[1]), new Box(Inventory.items[2])]);

// let obj = {
//   city: "St Polten",
//   weather: {
//     state: "rain",
//     temp: 5.0
//   }
// }

// const lel = () => {
//   serial.write(JSON.stringify(obj))
// }

// setInterval(lel, 5000)

// Setup / Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('request-order', requestData => {
    let req = JSON.parse(requestData);
    console.log(req)
    const completedOrders = Inventory.RequestItems(req);
    socket.emit('item-update', completedOrders);

    // Send blinking light to box
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
        break;
      case 'SENSOR':
        const percentage = frame.calculatePercentages(data);
        // Send data to arduino
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
app.get('/sensor', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/sensor.html'))
})

