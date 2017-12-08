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

  _timePeopleChart = _createTimePeopleChart();

  _crowdEmotionChart = _createCrowdEmotionChart([]);

  _genderEmotionChart = _createGenderEmotionChart(
    {
      name: 'male',
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    }, 
    {
      name: 'female',
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  ); 

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
}

let _createTimePeopleChart = () => {
  return Highcharts.chart('time-people', {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {}
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
}

let _createCrowdEmotionChart = (data) => {
  return Highcharts.chart("crowd-emotion", {
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
      data: data
    }]
  });
}

let _createGenderEmotionChart = (maleData, femaleData) => {
  return Highcharts.chart("gender-emotion", {
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
        text: 'Gender Count'
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
    series: [
      maleData, femaleData
    ],
    exporting: {
      enabled: false
    }
  });
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

let _updateCrowdEmotionChart = (emotionData, datasize) => {
  if (_crowdEmotionChart) {
    var count = parseInt($('#count').text(), 10);

    let data = _crowdEmotionChart.options.series[0].data;
    // Add all emotions that have a value
    if (data.length > 0) {
      for (var emotionKey in emotionData) {
        if (emotionData[emotionKey] > 0) {
          let index = data.findIndex((emotion) => {return emotion.name === emotionKey});
          if (index < 0) {
            data.push({
              name: emotionKey,
              y: (datasize * emotionData[emotionKey]) / (count + datasize)
            });
          } else {
            data[index] = {
              name: emotionKey,
              y: ((count * data[index].y) + (datasize * emotionData[emotionKey])) / (count + datasize)
            }
          }
        }
      }
    } else {
      for (var emotionKey in emotionData) {
        if (emotionData[emotionKey] > 0) {
          data.push({
            name: emotionKey,
            y: emotionData[emotionKey]
          });
        }
      }
    }
    _crowdEmotionChart = _createCrowdEmotionChart(data);
  }
};

let _updateGenderEmotionChart = (persons) => {
  if (_genderEmotionChart) {
    let maleData = _genderEmotionChart.options.series[0];
    let femaleData = _genderEmotionChart.options.series[1];

    persons.forEach((person) => {
      let emotionIndex = EMOTIONS.findIndex((EMOTION) => { return EMOTION === person.feeling; });
      if (person.gender === "male") {
        maleData.data[emotionIndex] = maleData.data[emotionIndex] + 1;
      } else {
        femaleData.data[emotionIndex] = femaleData.data[emotionIndex] + 1;
      }
    });

    _genderEmotionChart = _createGenderEmotionChart(maleData, femaleData); 
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
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> age <br><b>' +
              this.point.value + '</b> people <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
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

let renderCharts = () => {
  _render();
};

let updateCharts = (oData) => {
  if (oData.persons && oData.persons.length > 0) {

    _updateCrowdEmotionChart(oData.aggregatedAnalysis, oData.persons.length);

    _ageGroupEmotionChart.destroy();
    _updateAgeGroupEmotionChart(oData.heatmapdp);
    
    _updateGenderEmotionChart(oData.persons);

    _updateTimePeopleChart(oData.time, oData.persons.length);

    _updatePeopleCounter(oData.persons.length);//needs to come after _updateCrowdEmotionChart

  }
};

export {
  renderCharts,
  updateCharts
}
