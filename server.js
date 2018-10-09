const path = require('path');
const express = require('express');
const app = express();

const Item = require('./Item');

// Setup / Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// INIT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));

app.get('/', (req, res) => {
  let items = [i1, i2];
  res.render('index', {items});
});

let i1 = new Item('110U73', 'Screw 30x6mm', 25);
let i2 = new Item('1337OT', 'Hammer', 2);
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