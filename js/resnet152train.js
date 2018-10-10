Highcharts.chart('resnet152train', {
  chart: {
    backgroundColor: '#F3F5FF',
    type: 'column'
  },
  title: {
    text: 'ResNet152 train'
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
    data: [99, 54, 88, 77, 117]
  }, {
    name: 'PyTorch fp16',
    data: [152, 59, 138, 82, 172]
  }, {
    name: 'TensorFlow fp32',
    data: [73, 41, 59, 53, 80]
  }, {
    name: 'TensorFlow fp16',
    data: [101, 51, 82, 62, 108]
  }, {
    name: 'Caffe2 fp32',
    data: [85, 49, 74, 71, null]
  }, {
    name: 'Caffe2 fp16',
    data: [111, 61, 92, 86, null]
  }]
});