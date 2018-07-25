var colorSet = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var colorSet2 = {
	color1: 'rgb(183, 82, 82)',
  color2: 'rgb(136, 14, 79)',
  color3: 'rgb(74, 20, 140)',
  color4: 'rgb(49, 27, 146)',
  color5: 'rgb(26, 35, 126)',
  color6: 'rgb(13, 71, 161)',
  color7: 'rgb(1, 87, 155)',
  color8: 'rgb(0, 96, 100)',
  color9: 'rgb(0, 77, 64)',
  color10: 'rgb(27, 94, 32)',
  color11: 'rgb(51, 105, 30)',
  color12: 'rgb(130, 119, 23)',
  color13: 'rgb(245, 127, 23)',
  color14: 'rgb(255, 111, 0)',
  color15: 'rgb(230, 81, 0)',
  color16: 'rgb(191, 54, 12)',
  color17: 'rgb(62, 39, 35)',
  color18: 'rgb(33, 33, 33)',
  color19: 'rgb(38, 50, 56)'
}

var rnd100 = function(){
	return Math.round(Math.random() * 100);
};

// Put your data here
var GPU = ['GV100', 'P5000'];

var randomColor = function(){
	var rgb = [];
	for(var i = 0; i < 3; i++)
	    rgb.push(Math.floor(Math.random() * 255));
	return  'rgb('+ rgb.join(',') + ')';
};

var color = Chart.helpers.color;
var horizontalBarChartData = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.red).alpha(0.2).rgbString(),
		borderColor: colorSet.red,
		data: [
			Math.floor(573.4767025),
			Math.floor(291.43898)
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.orange).alpha(0.2).rgbString(),
		borderColor: colorSet.orange,
		data: [
			Math.floor(1221.374046),
			Math.floor(336.8421053)
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.yellow).alpha(0.2).rgbString(),
		borderColor: colorSet.yellow,
		data: [
			Math.floor(565.3710247),
			Math.floor(284.1918295)
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.green).alpha(0.2).rgbString(),
		borderColor: colorSet.green,
		data: [
			Math.floor(1095.890411),
			Math.floor(307.1017274)
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.blue).alpha(0.2).rgbString(),
		borderColor: colorSet.blue,
		data: [
			Math.floor(324.5436105),
			Math.floor(238.4500745)
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.purple).alpha(0.2).rgbString(),
		borderColor: colorSet.purple,
		data: [
			Math.floor(459.7701149),
			Math.floor(276.816609)
		]
	}]
};

var config = {
  type: 'horizontalBar',
    data: horizontalBarChartData,
		options: {
			// Elements options apply to all of the options unless overridden in a dataset
			// In this case, we are setting the border of each horizontal bar to be 2px wide
			elements: {
				rectangle: {
					borderWidth: 2,
				}
			},
			responsive: true,
			legend: {
				position: 'right',
			},
			tooltips: {
				// 'point' for single data point, 
				// 'index' for all data points in a group,
				// 'nearest' for single data point nearby.
			    mode: 'nearest', 
			    intersect: false
			},
			hover: {
			    mode: 'index',
			    intersect: false
			},
			title: {
				display: true,
				fontSize:20,
				fontColor:'#666',
				text: 'vgg16 eval (images per sec)'
			}
		}
};

var myChart = new Chart($("#myChart"), config);



/*
 * #randomizeData
 */
$("#randomizeData").click(function(){
	config.data.datasets.forEach(function(dataset){
		dataset.data = dataset.data.map(function(){
			return rnd100();
		});
	});

	myChart.update();
});

var colorNames = Object.keys(colorSet);

/*
 * #addDataset
 */
$("#addDataset").click(function(){
	var colorName = colorNames[config.data.datasets.length % colorNames.length];;
	var newColor = colorSet[colorName];

	var newDataset = {
		label: 'Dataset ' + config.data.datasets.length,
		borderColor: newColor,
		backgroundColor: color(newColor).alpha(0.2).rgbString(),
		pointBorderColor: newColor,
		data: [],
	};

	for (var index=0; index < config.data.labels.length; ++index) {
		newDataset.data.push(rnd100());
	}

	config.data.datasets.push(newDataset);
	myChart.update();
});

/*
 * #addData
 */
$("#addData").click(function(){
	if (config.data.datasets.length > 0){
		config.data.labels.push('dataset #' + config.data.labels.length);

		config.data.datasets.forEach(function(dataset){
			dataset.data.push(rnd100());
		});

		myChart.update();
	}
});

/*
 * #removeDataset
 */
$("#removeDataset").click(function(){
	config.data.datasets.splice(0, 1);
	myChart.update();
});

/*
 * #removeData
 */
$("#removeData").click(function(){
	config.data.labels.pop(); // remove the label first

	config.data.datasets.forEach(function(dataset){
		dataset.data.pop();
	});

	myChart.update();
});
