Highcharts.chart('vgg16eval', {
  chart: {
    backgroundColor: '#F3F5FF',
    type: 'column'
  },
  title: {
    text: 'VGG16 eval'
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
    data: [573, 291, 511, 401, 610]
  }, {
    name: 'PyTorch fp16',
    data: [1221, 336, 1088, 477, 1269]
  }, {
    name: 'TensorFlow fp32',
    data: [565, 284, 503, 369, 666]
  }, {
    name: 'TensorFlow fp16',
    data: [1095, 307, 993, 414, 1176]
  }, {
    name: 'Caffe2 fp32',
    data: [324, 238, 278, 340, null]
  }, {
    name: 'Caffe2 fp16',
    data: [459, 276, 384, 399, null]
  }]
});