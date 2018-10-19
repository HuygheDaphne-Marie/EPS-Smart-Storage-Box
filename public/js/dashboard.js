// Chart options
const $btn = document.querySelector('#gen');
let chartData = [];
const options = {
  chart: {
    height: 450,
    width: '50%',
    type: 'bar',
    background: '#f4f4f4',
    foreColor: '#333'
  },
  series: [{
    name: 'Number',
    data: chartData
  }],
  xaxis: {
    categories: ['Label1', 'Label2', 'Label3', 'Label4', 'Label5', 'Label6', 'Label7', 'Label8', 'Label9', 'Label10', 'Label11', 'Label12', 'Label13', 'Label14', 'Label15']
  },
  plotOptions: {
    bar: {
      horizontal: false,
    }
  },
  fill: {
    colors: ['#009688']
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: 'Some Random Numbers',
    align: 'center',
    margin: 20,
    offsetY: 20,
    style: {
      fontSize: '25px'
    }
  }
};

// Init chart
const chart = new ApexCharts(document.querySelector('#chart'), options);

function generateRandomNum() {
  return Math.floor(Math.random()*100+1)
}
for(let idx = 0; idx < 15; idx++) {
  chartData.push(generateRandomNum());
}

$btn.addEventListener('click', event => {
  let newData = [];
  for(let idx = 0; idx < 15; idx++) {
    newData.push(generateRandomNum());
  }
  chart.updateSeries([{
    name: 'Number',
    data: newData
  }])
})


// Render chart
chart.render();