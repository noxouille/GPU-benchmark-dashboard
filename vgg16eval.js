var colorSet = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var rnd100 = function(){
	return Math.round(Math.random() * 100);
};

// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040 = {
	'fp32': { 'GV100': 573, 'P5000': 291 },
  'fp16': { 'GV100': 1221, 'P5000': 336 }
};

var tf180 = {
	'fp32': { 'GV100': 565, 'P5000': 284 },
  'fp16': { 'GV100': 1095, 'P5000': 307 }
};

var caffe2081 = {
	'fp32': { 'GV100': 324, 'P5000': 238 },
  'fp16': { 'GV100': 459, 'P5000': 276 }
};

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
		backgroundColor: color(colorSet.red).alpha(0.8).rgbString(),
		borderColor: colorSet.red,
		data: [
			pytorch040["fp32"]["GV100"],
			pytorch040["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.orange).alpha(0.8).rgbString(),
		borderColor: colorSet.orange,
		data: [
			pytorch040["fp16"]["GV100"],
			pytorch040["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.yellow).alpha(0.8).rgbString(),
		borderColor: colorSet.yellow,
		data: [
			tf180["fp32"]["GV100"],
			tf180["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.green).alpha(0.8).rgbString(),
		borderColor: colorSet.green,
		data: [
			tf180["fp16"]["GV100"],
			tf180["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.blue).alpha(0.8).rgbString(),
		borderColor: colorSet.blue,
		data: [
			caffe2081["fp32"]["GV100"],
			caffe2081["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.purple).alpha(0.8).rgbString(),
		borderColor: colorSet.purple,
		data: [
			caffe2081["fp16"]["GV100"],
			caffe2081["fp16"]["P5000"]
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
