// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040_resnet152_train = {
	'fp32': { 'GV100': 99, 'P5000': 54 },
  'fp16': { 'GV100': 152, 'P5000': 59 }
};

var tf180_resnet152_train = {
	'fp32': { 'GV100': 73, 'P5000': 41 },
  'fp16': { 'GV100': 101, 'P5000': 51 }
};

var caffe2081_resnet152_train = {
	'fp32': { 'GV100': 85, 'P5000': 49 },
  'fp16': { 'GV100': 111, 'P5000': 61 }
};

var color = Chart.helpers.color;
var data_train = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.pytorch_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp32,
		data: [
			pytorch040_resnet152_train["fp32"]["GV100"],
			pytorch040_resnet152_train["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.pytorch_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp16,
		data: [
			pytorch040_resnet152_train["fp16"]["GV100"],
			pytorch040_resnet152_train["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.tf_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp32,
		data: [
			tf180_resnet152_train["fp32"]["GV100"],
			tf180_resnet152_train["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.tf_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp16,
		data: [
			tf180_resnet152_train["fp16"]["GV100"],
			tf180_resnet152_train["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.caffe2_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp32,
		data: [
			caffe2081_resnet152_train["fp32"]["GV100"],
			caffe2081_resnet152_train["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.caffe2_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp16,
		data: [
			caffe2081_resnet152_train["fp16"]["GV100"],
			caffe2081_resnet152_train["fp16"]["P5000"]
		]
	}]
};

var config_resnet152_train = {
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
			text: 'resnet152 train (images per sec)'
		}
	}
};

var chart_resnet152train = new Chart($("#chart_resnet152train"), config_resnet152_train);

var GV100visible_resnet152_train = true;
var P5000visible_resnet152_train = true;

$("#showOnlyGV100_resnet152_train").click(function(){
	if (P5000visible_resnet152_train === true) { // remove P5000 graph
		config_resnet152_train.data.labels.pop();
		config_resnet152_train.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_resnet152_train = !P5000visible_resnet152_train;
	}
	if (GV100visible_resnet152_train === false)	{ // show gv100 graph
		config_resnet152_train.data.labels[0] = "GV100";
		config_resnet152_train.data.datasets[0].data[0] = pytorch040_resnet152_train["fp32"]["GV100"];
		config_resnet152_train.data.datasets[1].data[0] = pytorch040_resnet152_train["fp16"]["GV100"];
		config_resnet152_train.data.datasets[2].data[0] = tf180_resnet152_train["fp32"]["GV100"];
		config_resnet152_train.data.datasets[3].data[0] = tf180_resnet152_train["fp16"]["GV100"];
		config_resnet152_train.data.datasets[4].data[0] = caffe2081_resnet152_train["fp32"]["GV100"];
		config_resnet152_train.data.datasets[5].data[0] = caffe2081_resnet152_train["fp16"]["GV100"];
		GV100visible_resnet152_train = !GV100visible_resnet152_train;
	}
	chart_resnet152train.update();
});

$("#showOnlyP5000_resnet152_train").click(function(){
	if (GV100visible_resnet152_train === true) { // remove gv100 graph
		config_resnet152_train.data.labels.splice(0, 1);
		config_resnet152_train.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_resnet152_train = !GV100visible_resnet152_train;
	}
	if (P5000visible_resnet152_train === false) { // show P5000 graph
		config_resnet152_train.data.labels[0] = "P5000";
		config_resnet152_train.data.datasets[0].data[0] = pytorch040_resnet152_train["fp32"]["P5000"];
		config_resnet152_train.data.datasets[1].data[0] = pytorch040_resnet152_train["fp16"]["P5000"];
		config_resnet152_train.data.datasets[2].data[0] = tf180_resnet152_train["fp32"]["P5000"];
		config_resnet152_train.data.datasets[3].data[0] = tf180_resnet152_train["fp16"]["P5000"];
		config_resnet152_train.data.datasets[4].data[0] = caffe2081_resnet152_train["fp32"]["P5000"];
		config_resnet152_train.data.datasets[5].data[0] = caffe2081_resnet152_train["fp16"]["P5000"];
		P5000visible_resnet152_train = !P5000visible_resnet152_train;
	}
	chart_resnet152train.update();
});

$("#resetGraph_resnet152_train").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_resnet152_train.data.labels[0] = "GV100";
	config_resnet152_train.data.datasets[0].data[0] = pytorch040_resnet152_train["fp32"]["GV100"];
	config_resnet152_train.data.datasets[1].data[0] = pytorch040_resnet152_train["fp16"]["GV100"];
	config_resnet152_train.data.datasets[2].data[0] = tf180_resnet152_train["fp32"]["GV100"];
	config_resnet152_train.data.datasets[3].data[0] = tf180_resnet152_train["fp16"]["GV100"];
	config_resnet152_train.data.datasets[4].data[0] = caffe2081_resnet152_train["fp32"]["GV100"];
	config_resnet152_train.data.datasets[5].data[0] = caffe2081_resnet152_train["fp16"]["GV100"];
	config_resnet152_train.data.labels[1] = "P5000";
	config_resnet152_train.data.datasets[0].data[1] = pytorch040_resnet152_train["fp32"]["P5000"];
	config_resnet152_train.data.datasets[1].data[1] = pytorch040_resnet152_train["fp16"]["P5000"];
	config_resnet152_train.data.datasets[2].data[1] = tf180_resnet152_train["fp32"]["P5000"];
	config_resnet152_train.data.datasets[3].data[1] = tf180_resnet152_train["fp16"]["P5000"];
	config_resnet152_train.data.datasets[4].data[1] = caffe2081_resnet152_train["fp32"]["P5000"];
	config_resnet152_train.data.datasets[5].data[1] = caffe2081_resnet152_train["fp16"]["P5000"];
	GV100visible_resnet152_train = true;
	P5000visible_resnet152_train = true;
	chart_resnet152train.update();
});

/*
 * #randomizeData
 */
$("#randomizeData").click(function(){
	config_resnet152_train.data.datasets.forEach(function(dataset){
		dataset.data = dataset.data.map(function(){
			return rnd100();
		});
	});

	chart_resnet152train.update();
});

var colorNames = Object.keys(colorSet);

/*
 * #addDataset
 */
$("#addDataset").click(function(){
	var colorName = colorNames[config_resnet152_train.data.datasets.length % colorNames.length];;
	var newColor = colorSet[colorName];

	var newDataset = {
		label: 'Dataset ' + config_resnet152_train.data.datasets.length,
		borderColor: newColor,
		backgroundColor: color(newColor).alpha(0.2).rgbString(),
		pointBorderColor: newColor,
		data: [],
	};

	for (var index=0; index < config_resnet152_train.data.labels.length; ++index) {
		newDataset.data.push(rnd100());
	}

	config_resnet152_train.data.datasets.push(newDataset);
	chart_resnet152train.update();
});

/*
 * #addData
 */
$("#addData").click(function(){
	if (config_resnet152_train.data.datasets.length > 0){
		config_resnet152_train.data.labels.push('dataset #' + config_resnet152_train.data.labels.length);

		config_resnet152_train.data.datasets.forEach(function(dataset){
			dataset.data.push(rnd100());
		});

		chart_resnet152train.update();
	}
});

/*
 * #removeDataset
 */
$("#removeDataset").click(function(){
	config_resnet152_train.data.datasets.splice(0, 1);
	chart_resnet152train.update();
});

/*
 * #removeData
 */
$("#removeData").click(function(){
	config_resnet152_train.data.labels.pop(); // remove the label first

	config_resnet152_train.data.datasets.forEach(function(dataset){
		dataset.data.pop();
	});

	chart_resnet152train.update();
});
