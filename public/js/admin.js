document.querySelectorAll('button[type="submit"]').forEach(button => {
  button.addEventListener('click', updateItemInfo)
});

function updateItemInfo(e) {
  e.preventDefault();
  const itemInfo = {}
  let atEnd = false
  let idx = 0

  while(!atEnd) {
    const element = e.srcElement.form[idx];
    if(element !== undefined) {
      if(element.type !== 'submit') {
        itemInfo[element.name] = element.value
      }
      idx++;
    } else {
      atEnd = true;
      itemInfo.UID = e.srcElement.id.split('-')[0].substr(e.srcElement.id.split('-')[0].length - 1)
      console.log(itemInfo)
      socket.emit('update-order', itemInfo)
    }
  }
}

socket.on('item-update', input => {
  let data = JSON.parse(input)
  console.log(`#ITEM${data.UID} span`)
  document.querySelector(`#ITEM${data.UID} span`).innerHTML = data.name;
  document.querySelector(`#ITEM${data.UID}-stock`).value = data.stock;
  document.querySelector(`#ITEM${data.UID}-name`).value = data.name;

})