// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040_vgg16_train = {
	'fp32': { 'GV100': 169, 'P5000': 89 },
  'fp16': { 'GV100': 239, 'P5000': 101 }
};

var tf180_vgg16_train = {
	'fp32': { 'GV100': 187, 'P5000': 91 },
  'fp16': { 'GV100': 293, 'P5000': 105 }
};

var caffe2081_vgg16_train = {
	'fp32': { 'GV100': 102, 'P5000': 69 },
  'fp16': { 'GV100': 122, 'P5000': 78 }
};

var color = Chart.helpers.color;
var data_train = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.pytorch_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp32,
		data: [
			pytorch040_vgg16_train["fp32"]["GV100"],
			pytorch040_vgg16_train["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.pytorch_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp16,
		data: [
			pytorch040_vgg16_train["fp16"]["GV100"],
			pytorch040_vgg16_train["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.tf_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp32,
		data: [
			tf180_vgg16_train["fp32"]["GV100"],
			tf180_vgg16_train["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.tf_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp16,
		data: [
			tf180_vgg16_train["fp16"]["GV100"],
			tf180_vgg16_train["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.caffe2_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp32,
		data: [
			caffe2081_vgg16_train["fp32"]["GV100"],
			caffe2081_vgg16_train["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.caffe2_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp16,
		data: [
			caffe2081_vgg16_train["fp16"]["GV100"],
			caffe2081_vgg16_train["fp16"]["P5000"]
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

var GV100visible_vgg16_train = true;
var P5000visible_vgg16_train = true;

$("#showOnlyGV100_vgg16_train").click(function(){
	if (P5000visible_vgg16_train === true) { // remove P5000 graph
		config_train.data.labels.pop();
		config_train.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_vgg16_train = !P5000visible_vgg16_train;
	}
	if (GV100visible_vgg16_train === false)	{ // show gv100 graph
		config_train.data.labels[0] = "GV100";
		config_train.data.datasets[0].data[0] = pytorch040_vgg16_train["fp32"]["GV100"];
		config_train.data.datasets[1].data[0] = pytorch040_vgg16_train["fp16"]["GV100"];
		config_train.data.datasets[2].data[0] = tf180_vgg16_train["fp32"]["GV100"];
		config_train.data.datasets[3].data[0] = tf180_vgg16_train["fp16"]["GV100"];
		config_train.data.datasets[4].data[0] = caffe2081_vgg16_train["fp32"]["GV100"];
		config_train.data.datasets[5].data[0] = caffe2081_vgg16_train["fp16"]["GV100"];
		GV100visible_vgg16_train = !GV100visible_vgg16_train;
	}
	chart_vgg16train.update();
});

$("#showOnlyP5000_vgg16_train").click(function(){
	if (GV100visible_vgg16_train === true) { // remove gv100 graph
		config_train.data.labels.splice(0, 1);
		config_train.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_vgg16_train = !GV100visible_vgg16_train;
	}
	if (P5000visible_vgg16_train === false) { // show P5000 graph
		config_train.data.labels[0] = "P5000";
		config_train.data.datasets[0].data[0] = pytorch040_vgg16_train["fp32"]["P5000"];
		config_train.data.datasets[1].data[0] = pytorch040_vgg16_train["fp16"]["P5000"];
		config_train.data.datasets[2].data[0] = tf180_vgg16_train["fp32"]["P5000"];
		config_train.data.datasets[3].data[0] = tf180_vgg16_train["fp16"]["P5000"];
		config_train.data.datasets[4].data[0] = caffe2081_vgg16_train["fp32"]["P5000"];
		config_train.data.datasets[5].data[0] = caffe2081_vgg16_train["fp16"]["P5000"];
		P5000visible_vgg16_train = !P5000visible_vgg16_train;
	}
	chart_vgg16train.update();
});

$("#resetGraph_vgg16_train").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_train.data.labels[0] = "GV100";
	config_train.data.datasets[0].data[0] = pytorch040_vgg16_train["fp32"]["GV100"];
	config_train.data.datasets[1].data[0] = pytorch040_vgg16_train["fp16"]["GV100"];
	config_train.data.datasets[2].data[0] = tf180_vgg16_train["fp32"]["GV100"];
	config_train.data.datasets[3].data[0] = tf180_vgg16_train["fp16"]["GV100"];
	config_train.data.datasets[4].data[0] = caffe2081_vgg16_train["fp32"]["GV100"];
	config_train.data.datasets[5].data[0] = caffe2081_vgg16_train["fp16"]["GV100"];
	config_train.data.labels[1] = "P5000";
	config_train.data.datasets[0].data[1] = pytorch040_vgg16_train["fp32"]["P5000"];
	config_train.data.datasets[1].data[1] = pytorch040_vgg16_train["fp16"]["P5000"];
	config_train.data.datasets[2].data[1] = tf180_vgg16_train["fp32"]["P5000"];
	config_train.data.datasets[3].data[1] = tf180_vgg16_train["fp16"]["P5000"];
	config_train.data.datasets[4].data[1] = caffe2081_vgg16_train["fp32"]["P5000"];
	config_train.data.datasets[5].data[1] = caffe2081_vgg16_train["fp16"]["P5000"];
	GV100visible_vgg16_train = true;
	P5000visible_vgg16_train = true;
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
