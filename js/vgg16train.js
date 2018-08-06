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

var pytorch040_train = {
	'fp32': { 'GV100': 169, 'P5000': 89 },
  'fp16': { 'GV100': 239, 'P5000': 101 }
};

var tf180_train = {
	'fp32': { 'GV100': 187, 'P5000': 91 },
  'fp16': { 'GV100': 293, 'P5000': 105 }
};

var caffe2081_train = {
	'fp32': { 'GV100': 102, 'P5000': 69 },
  'fp16': { 'GV100': 122, 'P5000': 78 }
};

var randomColor = function(){
	var rgb = [];
	for(var i = 0; i < 3; i++)
	    rgb.push(Math.floor(Math.random() * 255));
	return  'rgb('+ rgb.join(',') + ')';
};

var color = Chart.helpers.color;
var data_train = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.red).alpha(0.8).rgbString(),
		borderColor: colorSet.red,
		data: [
			pytorch040_train["fp32"]["GV100"],
			pytorch040_train["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.orange).alpha(0.8).rgbString(),
		borderColor: colorSet.orange,
		data: [
			pytorch040_train["fp16"]["GV100"],
			pytorch040_train["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.yellow).alpha(0.8).rgbString(),
		borderColor: colorSet.yellow,
		data: [
			tf180_train["fp32"]["GV100"],
			tf180_train["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.green).alpha(0.8).rgbString(),
		borderColor: colorSet.green,
		data: [
			tf180_train["fp16"]["GV100"],
			tf180_train["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.blue).alpha(0.8).rgbString(),
		borderColor: colorSet.blue,
		data: [
			caffe2081_train["fp32"]["GV100"],
			caffe2081_train["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.purple).alpha(0.8).rgbString(),
		borderColor: colorSet.purple,
		data: [
			caffe2081_train["fp16"]["GV100"],
			caffe2081_train["fp16"]["P5000"]
		]
	}]
};

var config_train = {
  type: 'horizontalBar',
  data: data_train,
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
			text: 'vgg16 train (images per sec)'
		}
	}
};

var chart_vgg16train = new Chart($("#chart_vgg16train"), config_train);

var GV100visible_train = true;
var P5000visible_train = true;

$("#showOnlyGV100_train").click(function(){
	if (P5000visible_train === true) { // remove P5000 graph
		config_train.data.labels.pop();
		config_train.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_train = !P5000visible_train;
	}
	if (GV100visible_train === false)	{ // show gv100 graph
		config_train.data.labels[0] = "GV100";
		config_train.data.datasets[0].data[0] = pytorch040_train["fp32"]["GV100"];
		config_train.data.datasets[1].data[0] = pytorch040_train["fp16"]["GV100"];
		config_train.data.datasets[2].data[0] = tf180_train["fp32"]["GV100"];
		config_train.data.datasets[3].data[0] = tf180_train["fp16"]["GV100"];
		config_train.data.datasets[4].data[0] = caffe2081_train["fp32"]["GV100"];
		config_train.data.datasets[5].data[0] = caffe2081_train["fp16"]["GV100"];
		GV100visible_train = !GV100visible_train;
	}
	chart_vgg16train.update();
});

$("#showOnlyP5000_train").click(function(){
	if (GV100visible_train === true) { // remove gv100 graph
		config_train.data.labels.splice(0, 1);
		config_train.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_train = !GV100visible_train;
	}
	if (P5000visible_train === false) { // show P5000 graph
		config_train.data.labels[0] = "P5000";
		config_train.data.datasets[0].data[0] = pytorch040_train["fp32"]["P5000"];
		config_train.data.datasets[1].data[0] = pytorch040_train["fp16"]["P5000"];
		config_train.data.datasets[2].data[0] = tf180_train["fp32"]["P5000"];
		config_train.data.datasets[3].data[0] = tf180_train["fp16"]["P5000"];
		config_train.data.datasets[4].data[0] = caffe2081_train["fp32"]["P5000"];
		config_train.data.datasets[5].data[0] = caffe2081_train["fp16"]["P5000"];
		P5000visible_train = !P5000visible_train;
	}
	chart_vgg16train.update();
});

$("#resetGraph_train").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_train.data.labels[0] = "GV100";
	config_train.data.datasets[0].data[0] = pytorch040_train["fp32"]["GV100"];
	config_train.data.datasets[1].data[0] = pytorch040_train["fp16"]["GV100"];
	config_train.data.datasets[2].data[0] = tf180_train["fp32"]["GV100"];
	config_train.data.datasets[3].data[0] = tf180_train["fp16"]["GV100"];
	config_train.data.datasets[4].data[0] = caffe2081_train["fp32"]["GV100"];
	config_train.data.datasets[5].data[0] = caffe2081_train["fp16"]["GV100"];
	config_train.data.labels[1] = "P5000";
	config_train.data.datasets[0].data[1] = pytorch040_train["fp32"]["P5000"];
	config_train.data.datasets[1].data[1] = pytorch040_train["fp16"]["P5000"];
	config_train.data.datasets[2].data[1] = tf180_train["fp32"]["P5000"];
	config_train.data.datasets[3].data[1] = tf180_train["fp16"]["P5000"];
	config_train.data.datasets[4].data[1] = caffe2081_train["fp32"]["P5000"];
	config_train.data.datasets[5].data[1] = caffe2081_train["fp16"]["P5000"];
	GV100visible_train = true;
	P5000visible_train = true;
	chart_vgg16train.update();
});

/*
 * #randomizeData
 */
$("#randomizeData").click(function(){
	config_train.data.datasets.forEach(function(dataset){
		dataset.data = dataset.data.map(function(){
			return rnd100();
		});
	});

	chart_vgg16train.update();
});

var colorNames = Object.keys(colorSet);

/*
 * #addDataset
 */
$("#addDataset").click(function(){
	var colorName = colorNames[config_train.data.datasets.length % colorNames.length];;
	var newColor = colorSet[colorName];

	var newDataset = {
		label: 'Dataset ' + config_train.data.datasets.length,
		borderColor: newColor,
		backgroundColor: color(newColor).alpha(0.2).rgbString(),
		pointBorderColor: newColor,
		data: [],
	};

	for (var index=0; index < config_train.data.labels.length; ++index) {
		newDataset.data.push(rnd100());
	}

	config_train.data.datasets.push(newDataset);
	chart_vgg16train.update();
});

/*
 * #addData
 */
$("#addData").click(function(){
	if (config_train.data.datasets.length > 0){
		config_train.data.labels.push('dataset #' + config_train.data.labels.length);

		config_train.data.datasets.forEach(function(dataset){
			dataset.data.push(rnd100());
		});

		chart_vgg16train.update();
	}
});

/*
 * #removeDataset
 */
$("#removeDataset").click(function(){
	config_train.data.datasets.splice(0, 1);
	chart_vgg16train.update();
});

/*
 * #removeData
 */
$("#removeData").click(function(){
	config_train.data.labels.pop(); // remove the label first

	config_train.data.datasets.forEach(function(dataset){
		dataset.data.pop();
	});

	chart_vgg16train.update();
});
