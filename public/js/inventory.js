const $btn = document.querySelector('#rTest');
const $list = document.querySelector('#requestList');
const $addBtn = document.querySelectorAll('.list-add')

let request = []

function showRequest() {
  let HTMLstr = '';
  request.forEach(item => {
    HTMLstr += `<li class="collection-item">${item.name} (${item.UID}): ${item.amount}</li>`
  })
  $list.innerHTML = HTMLstr;
}


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


$btn.addEventListener('click', event => {
  console.log('TRIG')
  $addBtn.forEach(btn => {
    btn.classList.toggle('active');
  });
  $list.classList.toggle('active');
});