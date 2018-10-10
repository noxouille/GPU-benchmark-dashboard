Highcharts.chart('resnet152eval', {
  chart: {
    backgroundColor: '#F3F5FF',
    type: 'column'
  },
  title: {
    text: 'ResNet152 eval'
  },
  subtitle: {
    text: 'Source: https://github.com/noxouille/deep-learning-benchmark'
  },
  xAxis: {
    categories: [
      'GV100',
      'P5000',
      'Titan V',
      '1080Ti',
      'V100'
    ],
    crosshair: true
  },
  yAxis: {
    min: 0,
    title: {
      text: 'images/s'
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.0f} images/s</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [{
    name: 'PyTorch fp32',
    data: [365, 188, 327, 276, 413]
  }, {
    name: 'PyTorch fp16',
    data: [683, 227, 613, 341, 737]
  }, {
    name: 'TensorFlow fp32',
    data: [345, 174, 318, 229, 406]
  }, {
    name: 'TensorFlow fp16',
    data: [613, 217, 563, 296, 707]
  }, {
    name: 'Caffe2 fp32',
    data: [243, 144, 215, 205, null]
  }, {
    name: 'Caffe2 fp16',
    data: [329, 186, 281, 259, null]
  }]
});