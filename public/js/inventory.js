const $btn = document.querySelector('#rTest');
const $list = document.querySelector('#requestList');
const $addBtn = document.querySelectorAll('.list-add')

let request = []

function ToggleRequestVisibility() {
  $addBtn.forEach(btn => {
    btn.classList.toggle('active');
  });
  $list.classList.toggle('active');
}

function showRequest() {
  let HTMLstr = '';
  request.forEach(item => {
    HTMLstr += `<li class="collection-item">${item.name} (${item.UID}): ${item.amount}</li>`
  })
  $list.innerHTML = HTMLstr + '<li class="collection-item teal lighten-2"><button id="requestSubmit" class="btn teal" onclick="submitRequest(this)">Request</button></li>';
}

function submitRequest(event) {
  socket.emit('request-order', JSON.stringify(request));
  request = [];
  showRequest();
  ToggleRequestVisibility();
}

socket.on('item-update', itemData => {
  console.log(itemData)
  itemData.completed.forEach(item => {
    document.querySelector(`#${item._UID} p`).innerHTML = `${item._name} (${item._UID}) has ${item._stock} units in stock`
    if(item._stock === 0) {
      const card = document.querySelector(`#${item._UID}`);
      card.classList.toggle('teal');
      card.classList.toggle('red')
    }
  })
  itemData.failed.forEach(fail => {
    M.toast({html: `Request for ${fail.item._name} failed, ${fail.err}`})
  })
})

$addBtn.forEach(btn => {
  btn.addEventListener('click', event => {
    const item = request.find(itemRequest => {
      return itemRequest.UID === btn.getAttribute('data-UID');
    })

    if(item !== undefined) {
      item.amount++;
    } else {
      request.push({name: btn.getAttribute('data-name'), UID: btn.getAttribute('data-UID'), amount: 1})
    }
    showRequest();
  })
})

$btn.addEventListener('click', ToggleRequestVisibility);