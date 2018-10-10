Highcharts.chart('vgg16train', {
  chart: {
    backgroundColor: '#F3F5FF',
    type: 'column'
  },
  title: {
    text: 'VGG16 train'
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
    data: [169, 89, 147, 121, 191]
  }, {
    name: 'PyTorch fp16',
    data: [239, 101, 224, 136, 272]
  }, {
    name: 'TensorFlow fp32',
    data: [187, 91, 101, 121, 223]
  }, {
    name: 'TensorFlow fp16',
    data: [293, 105, 165, 132, 323]
  }, {
    name: 'Caffe2 fp32',
    data: [102, 69, 86, 100, null]
  }, {
    name: 'Caffe2 fp16',
    data: [122, 78, 102, 116, null]
  }]
});