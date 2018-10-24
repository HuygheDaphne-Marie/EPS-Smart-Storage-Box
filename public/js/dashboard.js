// Chart options
const $btn = document.querySelector('#gen');
let chartData = [];
let c3Data = [];

const options = {
  chart: {
    type: 'bar',
    // background: '#f4f4f4',
    // foreColor: '#333',
    height: 350,
    width: '100%'
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
const options1 = {
  chart: {
    type: 'radialBar',
    // background: '#f4f4f4',
    // foreColor: '#333',
    height: 350
  },
  series: [44, 55, 67, 83],
  plotOptions: {
    circle: {
      dataLabels: {
          showOn: 'hover'
      }
    }
  },
  labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
  dataLabels: {
    enabled: false
  }
};
const options2 = {
  chart: {
    type: 'donut',
    // background: '#f4f4f4',
    // foreColor: '#333',
    height: 350
  },
  series: [44, 25, 49],
  labels: ['Apples', 'Oranges', 'Bananas'],
  legend: {
    show: false
  },
  dataLabels: {
    enabled: false
  }
};
const options3 = {
  chart: {
    type: 'bar',
    // background: '#f4f4f4',
    // foreColor: '#333',
    height: 350,
    // width: '100%'
  },
  series: [{
    name: 'Number',
    data: c3Data
  }],
  xaxis: {
    categories: ['Label1', 'Label2', 'Label3', 'Label4', 'Label5', 'Label6']
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

const heatOptions = {
  chart: {
    type: 'heatmap',
    height: 350
  },
  dataLabels: {
    enabled: false
  },
  series: [{
    name: 'Monday',
    data: genData(24, {max: 100, min: 1})
  },
  {
    name: 'Tuesday',
    data: genData(24, {max: 100, min: 1})
  },
  {
    name: 'Wednesday',
    data: genData(24, {max: 100, min: 1})
  },
  {
    name: 'Thursday',
    data: genData(24, {max: 100, min: 1})
  },
  {
    name: 'Friday',
    data: genData(24, {max: 100, min: 1})
  },
  {
    name: 'Saturday',
    data: genData(24, {max: 100, min: 1})
  },
  {
    name: 'Sunday',
    data: genData(24, {max: 100, min: 1})
  }
],
xaxis: {
  type: 'category',
},
title: {
  text: 'Weekly Usage'
}
}

// Init chart
const chart = new ApexCharts(document.querySelector('#chart'), options);
const c1 = new ApexCharts(document.querySelector('#c1'), options1);
const c2 = new ApexCharts(document.querySelector('#c2'), options2);
const c3 = new ApexCharts(document.querySelector('#c3'), options3);
const heat = new ApexCharts(document.querySelector('#heat'), heatOptions);

function genData(count, options) {
  let series = [];
  for(let i = 0; i < count; i++) {
    series.push({
      x: (i < 9) ? `0${i+1}:00` : `${i+1}:00`,
      y: Math.floor(Math.random() * (options.max - options.min + 1)) + options.min
    })
  }
  return series;
}

function generateRandomNum() {
  return Math.floor(Math.random()*100+1)
}
for(let idx = 0; idx < 15; idx++) {
  chartData.push(generateRandomNum());
}
for(let idx = 0; idx < 6; idx++) {
  c3Data.push(generateRandomNum());
}

$btn.addEventListener('click', event => {
  let newData = [];
  for(let idx = 0; idx < 15; idx++) {
    newData.push(generateRandomNum());
  }
  heat.updateSeries([
    {
      name: 'Monday',
      data: genData(24, {max: 100, min: 1})
    },
    {
      name: 'Tuesday',
      data: genData(24, {max: 100, min: 1})
    },
    {
      name: 'Wednesday',
      data: genData(24, {max: 100, min: 1})
    },
    {
      name: 'Thursday',
      data: genData(24, {max: 100, min: 1})
    },
    {
      name: 'Friday',
      data: genData(24, {max: 100, min: 1})
    },
    {
      name: 'Saturday',
      data: genData(24, {max: 100, min: 1})
    },
    {
      name: 'Sunday',
      data: genData(24, {max: 100, min: 1})
    }
  ])
  chart.updateSeries([{
    name: 'Number',
    data: newData
  }])
  c1.updateSeries([newData[2], newData[4], newData[5], newData[8]])
  c2.updateSeries([newData[2], newData[4], newData[5]])
  c3.updateSeries([{
    name: 'Number',
    data: [newData[2], newData[4], newData[5], newData[8], newData[9], newData[11]]
  }])
  
})


// Render chart
chart.render();
c1.render();
c2.render();
c3.render();
heat.render();