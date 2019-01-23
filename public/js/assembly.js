(function () {
    'use strict';

    const yourOrderTemplate = document.querySelector('#your-order-tmpl');
    const errTemplate = document.querySelector('#err-tmpl');
    const assemblyTemplate = document.querySelector('#assembly-item-tmpl');
    const takePartTemplate = document.querySelector('#take-item-tmpl');
    const finishedTemplate = document.querySelector('#finished-tmpl');

    let currIndex = 0;

    function init() {
        if(!window.orderedItems || window.orderedItems.length === 0) {
            errTemplate.classList.remove('hide');
            document.querySelector('#prevStep').classList.add('hide');
            document.querySelector('#nextStep').classList.add('hide');

            return;
        }
        document.querySelector('#prevStep').classList.add('hide');
        document.querySelector('#nextStep').classList.add('hide');
        document.querySelector('#startAssembly').addEventListener('click', startAssembly);
        document.querySelector('#nextStep').addEventListener('click', goNext);
        //document.querySelector('#prevStep').addEventListener('click', goPrev);

        //for(const item of window.orderedItems){           //use just for random smartie colors
        //    item.color = '#' + Math.round(Math.random()*Math.pow(16,6)-1).toString(16).padStart(6, '0');
        //}
        showOrderTube();
        //applyIndex(currIndex);
    }

    function startAssembly(){
        applyIndex(currIndex);
        updateTakeItemTemplate();
        document.querySelector('#startAssembly').classList.add('hide');
        document.querySelector('#nextStep').classList.remove('hide');
    }

    function goNext(){
        //document.querySelector('#prevStep').classList.remove('hide');
        if(currIndex >= window.orderedItems.length * 2){
            return;
        }
        applyIndex(++currIndex);
    }

    function goPrev(){
        document.querySelector('#nextStep').classList.remove('hide');
        if(currIndex===0){
            return;
        }
        if(--currIndex === 0) {
            //document.querySelector('#prevStep').classList.add('hide');
        }
        applyIndex(currIndex);
    }

    function showOrderTube(){
        yourOrderTemplate.classList.remove('hide');
        const container = yourOrderTemplate.querySelector('.yourOrderTube');
        for(let i = 0; i < window.orderedItems.length; i++) {
            const smartie = document.createElement('div');
            smartie.classList.add('smartie');
            smartie.style.background = "radial-gradient(circle at 20% 140%, #81e8f6, dark" + window.orderedItems[i].item.color + " 5%, " + window.orderedItems[i].item.color + " 80%, white 100%)";
            container.appendChild(smartie);
        }
    }

    function applyIndex(){
      // Notify backend which item is being taken..
      let idx = Math.floor(currIndex/2)
      // console.log('CURR', window.orderedItems[idx]) // Used for finding right idx
      if(typeof(window.orderedItems[idx]) !== 'undefined') {
        socket.emit('BLINK', window.orderedItems[idx].item)
      }

      yourOrderTemplate.classList.add('hide');
      takePartTemplate.classList.add('hide');
      assemblyTemplate.classList.add('hide');
      finishedTemplate.classList.add('hide');

      if(currIndex >= orderedItems.length * 2){
        return updateFinishTemplate();
      }
      if(currIndex % 2 === 0){
        return updateTakeItemTemplate();
      }
      return updateAssemblyTemplate();
    }

    function updateAssemblyTemplate(){
        assemblyTemplate.classList.remove('hide');

        const container = assemblyTemplate.querySelector('.smartieContainer');
        container.innerHTML = '';

        for(let i = 0; i < currIndex/2; i++){
            for(let j = 0; j < window.orderedItems[i].amount; j++){
                const smartie = createSmartie(window.orderedItems[i].item.color);   //window.orderedItems[i].color for random color

                if(i === Math.floor(currIndex/2)) {
                    smartie.classList.add('animated');
                }

                container.appendChild(smartie);
            }
        }
    }

    function updateTakeItemTemplate() {
        takePartTemplate.classList.remove('hide');

        const currItem = window.orderedItems[Math.floor(currIndex/2)];
        const amountEl = takePartTemplate.querySelector('.amount');
        const typeEl = takePartTemplate.querySelector('.type');

        amountEl.textContent = currItem.amount;
        typeEl.textContent = currItem.item.name;

        //console.log(window.orderedItems);
    }

    function updateFinishTemplate(){
        finishedTemplate.classList.remove('hide');
        document.querySelector('#nextStep').classList.add('hide');
    }

    function createSmartie(color){
        const smartie = document.createElement('div');
        smartie.classList.add('smartie');
        smartie.style.background = "radial-gradient(circle at 20% 140%, #81e8f6, dark" + color + " 5%, " + color + " 80%, white 100%)";

        return smartie;
    }

    init();
}());