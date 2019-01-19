const $btn = document.querySelector('#rTest');
const $list = document.querySelector('#requestList');
const $addBtn = document.querySelectorAll('.list-add');

let request = [];

function ToggleRequestVisibility() {
  $btn.classList.toggle('active');
  $addBtn.forEach(btn => {
    btn.classList.toggle('active');
  });
  $list.classList.toggle('active');
}

function showRequest() {
  let HTMLstr = '';
  var loopcounter = 0;
  request.forEach(item => {
    HTMLstr += `<li id="${loopcounter}" class="collection-item">${item.name} (ID: ${item.UID}): ${item.amount}<button class="right btn-flat btn-small transparent" onclick="removeItem(${loopcounter})"><i class="material-icons blue-grey-text">cancel</i></button></li>`;
    loopcounter++;
  });
  $list.innerHTML = HTMLstr + '<li class="collection-item grey lighten-2"><button id="requestSubmit" class="btn grey" onclick="submitRequest(this)">Order</button></li>';
}

function submitRequest(event) {
  socket.emit('request-order', JSON.stringify(request));
  request = [];
  showRequest();
  ToggleRequestVisibility();
}

socket.on('item-update', itemData => {
  console.log(itemData);
  itemData.completed.forEach(item => {
    console.log("GETTING", item.UID)
    document.querySelector(`#ITEM${item.UID} p`).innerHTML = `${item.name} (${item.UID}) has ${item.stock} units in stock`;
    if(item.stock === 0) {
      const card = document.querySelector(`#ITEM${item.UID}`);
      card.classList.toggle('grey');
      card.classList.toggle('red')
    }
  });
  itemData.failed.forEach(fail => {
    M.toast({html: `Request for ${fail.item.name} failed, ${fail.err}`})
  })
});

$addBtn.forEach(btn => {
  btn.addEventListener('click', event => {
    /*const item = request.find(itemRequest => {
      return itemRequest.UID === btn.getAttribute('data-UID');
    });*/
    const item = request[request.length - 1];
    if(item && item.UID === btn.dataset.uid) {
      item.amount++;
    } else {
      request.push({name: btn.getAttribute('data-name'), UID: btn.getAttribute('data-UID'), amount: 1})
    }
    showRequest();
  })
});

function removeItem(count){
    request.splice(count, 1);
    var element = document.getElementById(count);
    element.parentNode.removeChild(element);
    console.log(request);
}

$btn.addEventListener('click', ToggleRequestVisibility);