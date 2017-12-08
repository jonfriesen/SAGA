let _ageGroupEmotionChart, _crowdEmotionChart, _genderEmotionChart, _timePeopleChart;
const AGE_GROUPS = [
  "<10",
  "11-20",
  "21-30",
  "31-40",
  "41-50",
  "51-60",
  "61-70",
  "70+"
];
const EMOTIONS = [
  "anger",
  "contempt",
  "disgust",
  "fear",
  "happiness",
  "neutral",
  "sadness",
  "surprise"
];

let _render = () => {
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  _timePeopleChart = Highcharts.chart('time-people', {
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
          Highcharts.numberFormat(this.y, 0);
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'People',
      data: (function () {
        return [];
      }())
    }]
  });

  _crowdEmotionChart = Highcharts.chart("crowd-emotion", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Breakdown All Emotions'
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
    exporting: {
      enabled: false
    },
    series: [{
      name: 'Emotions',
      colorByPoint: true,
      data: []
    }]
  });

  _ageGroupEmotionChart = Highcharts.chart("agegroup-emotion", {

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
      categories: AGE_GROUPS
    },

    yAxis: {
      categories: EMOTIONS,
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
      name: 'Emotion Intensities per Age Group',
      borderWidth: 1,
      data: [],
      dataLabels: {
        enabled: true,
        format: '{point.value:.2f}',
        color: '#000000'
      },
      exporting: {
        enabled: false
      }
    }]

  });

  _genderEmotionChart = Highcharts.chart("gender-emotion", {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Strongest Emotion by Gender'
    },
    xAxis: {
      categories: EMOTIONS
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

  // let x = (new Date()).getTime(); // current time
  // let y = Math.random();
  // _timePeopleChart.series[0].addPoint([x, y]);
  // _timePeopleChart.series[0].addPoint([(new Date()).getTime(), Math.random()]);
}

let _updateTimePeopleChart = (time, numberOfPeople) => {
  if (_timePeopleChart) {
    _timePeopleChart.series[0].addPoint([time, numberOfPeople]);
  }
};

let _updatePeopleCounter = (numberOfPeople) => {
  var count = parseInt($('#count').text(), 10);
  if (count >= 0) {
    $('#count').text(count + numberOfPeople);
  }
};

let _updateCrowdEmotionChart = (emotionData) => {
  if (_crowdEmotionChart) {
    // Add all emotions that have a value
    for (var emotionKey in emotionData) {
      if (emotionData[emotionKey] > 0) {
        _crowdEmotionChart.series[0].addPoint({
          name: emotionKey,
          y: emotionData[emotionKey]
        });
      }
    }
  }
};

let _getAgeGroupIndex = age => {
  const AGE_GROUP_INCREMENT = 10;
  let _index = 0;
  let _upperBound = 11;

  do {
    if (age < _upperBound) {
      return _index;
    }
    _upperBound += AGE_GROUP_INCREMENT;
    _index++;
  } while (_index < AGE_GROUPS.length);
  return _index;
};

// this is broken
let _updateAgeGroupEmotionChart = newDatapoints => {
  _ageGroupEmotionChart = Highcharts.chart("agegroup-emotion", {

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
          categories: AGE_GROUPS
        },

        yAxis: {
          categories: EMOTIONS,
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
          name: 'Emotion Intensities per Age Group',
          borderWidth: 1,
          data: newDatapoints,
          dataLabels: {
            enabled: true,
            format: '{point.value:.2f}',
            color: '#000000'
          },
          exporting: {
            enabled: false
          }
        }]

      });
};

let _updateGenderEmotionChart = (time, numberOfPeople) => {
  if (_genderEmotionChart) {
    _genderEmotionChart.series[0].addPoint([time, numberOfPeople]);
  }
};

let renderCharts = () => {
  _render();
};

let updateCharts = (oData) => {
  if (oData.persons && oData.persons.length > 0) {
    _updateTimePeopleChart(oData.time, oData.persons.length);

    _updatePeopleCounter(oData.persons.length);

    _updateCrowdEmotionChart(oData.aggregatedAnalysis);

    _ageGroupEmotionChart.destroy();
    _updateAgeGroupEmotionChart(oData.heatmapdp);
  }
};

export {
  renderCharts,
  updateCharts
}
