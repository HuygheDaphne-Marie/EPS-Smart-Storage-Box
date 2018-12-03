const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Inventory = require('./InventoryManger');
const SerialComms = require('./SerialComms');
const Box = require('./Box');
const Frame = require('./Frame');
const serial = new SerialComms(process.argv[2]) 

const frame = new Frame();
const box1 = new Box(Inventory.items[0], serial);
const box2 = new Box(Inventory.items[1], serial);
const box3 = new Box(Inventory.items[2], serial);
frame.addBox(box1);
frame.addBox(box2);
frame.addBox(box3);

serial.write('serial check');
frame.boxes[0].serial.write('this is box 0');
frame.boxes[1].serial.write('this is box 1');

console.log(frame.boxes.length)
frame.removeBox(1)
console.log(frame.boxes.length)

// Setup / Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('request-order', requestData => {
    let req = JSON.parse(requestData);
    const completedOrders = Inventory.RequestItems(req);
    socket.emit('item-update', completedOrders);
  })

  socket.on('led', lightOn => {
    if(lightOn) {
      serial.write('0');
    } else {
      serial.write('1');
    }
  })

  socket.on('fullness', percent => {
    serial.write(`${percent}`);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

serial.on('message', data => {
  if(data.type === "sensor") {
    io.emit('sensor-update', data.value);
  } else {
    console.log('Uncatagorized message:', data)
  }
});

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

