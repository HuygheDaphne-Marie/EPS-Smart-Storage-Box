const path = require('path');
const express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const Inventory = require('./InventoryManger')

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

    // send new item data to client
    socket.emit('item-update', completedOrders);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
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

