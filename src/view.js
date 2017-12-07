let timePeopleChart;
let crowdEmotion;

function _render() {
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  timePeopleChart = Highcharts.chart('time-people', {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        // load: function () {

        //   // set up the updating of the chart each second
        //   var series = this.series[0];
        //   setInterval(function () {
        //     var x = (new Date()).getTime(), // current time
        //       y = Math.random();
        //     series.addPoint([x, y]);
        //   }, 1000);
        // }
      }
    },
    title: {
      text: 'Time vs People'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Number of People'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%H:%M:%S', this.x) + '<br/>' +
          Highcharts.numberFormat(this.y, 1);
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'TimePeople',
      data: (function () {
        return [];
      }())
    }]
  });

  crowdEmotion = Highcharts.chart("crowd-emotion", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Browser market shares January, 2015 to May, 2015'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'IE',
        y: 56.33
      }, {
        name: 'Chrome',
        y: 24.03,
        sliced: true,
        selected: true
      }, {
        name: 'Firefox',
        y: 10.38
      }, {
        name: 'Safari',
        y: 4.77
      }, {
        name: 'Opera',
        y: 0.91
      }, {
        name: 'Other',
        y: 0.2
      }]
    }]
  });

  Highcharts.chart("gender-emotion", {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Strongest Emotion by Gender'
    },
    xAxis: {
      categories: [
        "Anger",
        "Contempt",
        "Disgust",
        "Fear",
        "Happiness",
        "Neutral",
        "Sadness",
        "Surprise"
      ]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
        }
      }
    },
    series: [{
      name: 'Male',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Female',
      data: [2, 2, 3, 2, 1]
    }]
  });

  Highcharts.chart("agegroup-emotion", {

    chart: {
      type: 'heatmap',
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1
    },


    title: {
      text: 'Intensity per Age Group per Emotion'
    },

    xAxis: {
      categories: ["<10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "70+"]
    },

    yAxis: {
      categories: [
        "Anger",
        "Contempt",
        "Disgust",
        "Fear",
        "Happiness",
        "Neutral",
        "Sadness",
        "Surprise"
      ],
      title: null
    },

    colorAxis: {
      min: 0,
      minColor: '#FFFFFF',
      maxColor: Highcharts.getOptions().colors[0]
    },

    legend: {
      align: 'right',
      layout: 'vertical',
      margin: 0,
      verticalAlign: 'top',
      y: 25,
      symbolHeight: 280
    },

    tooltip: {
      formatter: function () {
        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
          this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
      }
    },

    series: [{
      name: 'Sales per employee',
      borderWidth: 1,
      data: [[0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]],
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]

  });

  let x = (new Date()).getTime(); // current time
  let y = Math.random();
  timePeopleChart.series[0].addPoint([x, y]);
  timePeopleChart.series[0].addPoint([(new Date()).getTime(), Math.random()]);
}

function _updateTimePeopleChart(time, numberOfPeople) {
  if (timePeopleChart) {
    timePeopleChart.series[0].addPoint([time, numberOfPeople]);
  }
}

var renderCharts = function () {
  _render();
};

var updateCharts = function (persons) {
  if (persons && persons.length > 0) {
    _updateTimePeopleChart(persons[0].time, persons.length);

  }
};

export {
  renderCharts,
  updateCharts
}
