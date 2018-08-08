// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040_resnet152_eval = {
	'fp32': { 'GV100': 365, 'P5000': 188 },
  'fp16': { 'GV100': 683, 'P5000': 227 }
};

var tf180_resnet152_eval = {
	'fp32': { 'GV100': 345, 'P5000': 174 },
  'fp16': { 'GV100': 613, 'P5000': 217 }
};

var caffe2081_resnet152_eval = {
	'fp32': { 'GV100': 243, 'P5000': 144 },
  'fp16': { 'GV100': 329, 'P5000': 186 }
};

var color = Chart.helpers.color;
var data_eval = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.pytorch_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp32,
		data: [
			pytorch040_resnet152_eval["fp32"]["GV100"],
			pytorch040_resnet152_eval["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.pytorch_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp16,
		data: [
			pytorch040_resnet152_eval["fp16"]["GV100"],
			pytorch040_resnet152_eval["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.tf_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp32,
		data: [
			tf180_resnet152_eval["fp32"]["GV100"],
			tf180_resnet152_eval["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.tf_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp16,
		data: [
			tf180_resnet152_eval["fp16"]["GV100"],
			tf180_resnet152_eval["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.caffe2_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp32,
		data: [
			caffe2081_resnet152_eval["fp32"]["GV100"],
			caffe2081_resnet152_eval["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.caffe2_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp16,
		data: [
			caffe2081_resnet152_eval["fp16"]["GV100"],
			caffe2081_resnet152_eval["fp16"]["P5000"]
		]
	}]
};

var config_resnet152_eval = {
  type: 'horizontalBar',
  data: data_eval,
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
			text: 'resnet152 eval (images per sec)'
		}
	}
};

var chart_resnet152_eval = new Chart($("#chart-resnet152-eval"), config_resnet152_eval);

var GV100visible_resnet152_eval = true;
var P5000visible_resnet152_eval = true;

$("#showOnlyGV100-resnet152-eval").click(function(){
	if (P5000visible_resnet152_eval === true) { // remove P5000 graph
		config_resnet152_eval.data.labels.pop();
		config_resnet152_eval.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_resnet152_eval = !P5000visible_resnet152_eval;
	}
	if (GV100visible_resnet152_eval === false)	{ // show gv100 graph
		config_resnet152_eval.data.labels[0] = "GV100";
		config_resnet152_eval.data.datasets[0].data[0] = pytorch040_resnet152_eval["fp32"]["GV100"];
		config_resnet152_eval.data.datasets[1].data[0] = pytorch040_resnet152_eval["fp16"]["GV100"];
		config_resnet152_eval.data.datasets[2].data[0] = tf180_resnet152_eval["fp32"]["GV100"];
		config_resnet152_eval.data.datasets[3].data[0] = tf180_resnet152_eval["fp16"]["GV100"];
		config_resnet152_eval.data.datasets[4].data[0] = caffe2081_resnet152_eval["fp32"]["GV100"];
		config_resnet152_eval.data.datasets[5].data[0] = caffe2081_resnet152_eval["fp16"]["GV100"];
		GV100visible_resnet152_eval = !GV100visible_resnet152_eval;
	}
	chart_resnet152_eval.update();
});

$("#showOnlyP5000-resnet152-eval").click(function(){
	if (GV100visible_resnet152_eval === true) { // remove gv100 graph
		config_resnet152_eval.data.labels.splice(0, 1);
		config_resnet152_eval.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_resnet152_eval = !GV100visible_resnet152_eval;
	}
	if (P5000visible_resnet152_eval === false) { // show P5000 graph
		config_resnet152_eval.data.labels[0] = "P5000";
		config_resnet152_eval.data.datasets[0].data[0] = pytorch040_resnet152_eval["fp32"]["P5000"];
		config_resnet152_eval.data.datasets[1].data[0] = pytorch040_resnet152_eval["fp16"]["P5000"];
		config_resnet152_eval.data.datasets[2].data[0] = tf180_resnet152_eval["fp32"]["P5000"];
		config_resnet152_eval.data.datasets[3].data[0] = tf180_resnet152_eval["fp16"]["P5000"];
		config_resnet152_eval.data.datasets[4].data[0] = caffe2081_resnet152_eval["fp32"]["P5000"];
		config_resnet152_eval.data.datasets[5].data[0] = caffe2081_resnet152_eval["fp16"]["P5000"];
		P5000visible_resnet152_eval = !P5000visible_resnet152_eval;
	}
	chart_resnet152_eval.update();
});

$("#resetGraph-resnet152-eval").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_resnet152_eval.data.labels[0] = "GV100";
	config_resnet152_eval.data.datasets[0].data[0] = pytorch040_resnet152_eval["fp32"]["GV100"];
	config_resnet152_eval.data.datasets[1].data[0] = pytorch040_resnet152_eval["fp16"]["GV100"];
	config_resnet152_eval.data.datasets[2].data[0] = tf180_resnet152_eval["fp32"]["GV100"];
	config_resnet152_eval.data.datasets[3].data[0] = tf180_resnet152_eval["fp16"]["GV100"];
	config_resnet152_eval.data.datasets[4].data[0] = caffe2081_resnet152_eval["fp32"]["GV100"];
	config_resnet152_eval.data.datasets[5].data[0] = caffe2081_resnet152_eval["fp16"]["GV100"];
	config_resnet152_eval.data.labels[1] = "P5000";
	config_resnet152_eval.data.datasets[0].data[1] = pytorch040_resnet152_eval["fp32"]["P5000"];
	config_resnet152_eval.data.datasets[1].data[1] = pytorch040_resnet152_eval["fp16"]["P5000"];
	config_resnet152_eval.data.datasets[2].data[1] = tf180_resnet152_eval["fp32"]["P5000"];
	config_resnet152_eval.data.datasets[3].data[1] = tf180_resnet152_eval["fp16"]["P5000"];
	config_resnet152_eval.data.datasets[4].data[1] = caffe2081_resnet152_eval["fp32"]["P5000"];
	config_resnet152_eval.data.datasets[5].data[1] = caffe2081_resnet152_eval["fp16"]["P5000"];
	GV100visible_resnet152_eval = true;
	P5000visible_resnet152_eval = true;
	chart_resnet152_eval.update();
});

/*
 * #randomizeData
 */
$("#randomizeData").click(function(){
	config_resnet152_eval.data.datasets.forEach(function(dataset){
		dataset.data = dataset.data.map(function(){
			return rnd100();
		});
	});

	chart_resnet152_eval.update();
});

var colorNames = Object.keys(colorSet);

/*
 * #addDataset
 */
$("#addDataset").click(function(){
	var colorName = colorNames[config_resnet152_eval.data.datasets.length % colorNames.length];;
	var newColor = colorSet[colorName];

	var newDataset = {
		label: 'Dataset ' + config_resnet152_eval.data.datasets.length,
		borderColor: newColor,
		backgroundColor: color(newColor).alpha(0.2).rgbString(),
		pointBorderColor: newColor,
		data: [],
	};

	for (var index=0; index < config_resnet152_eval.data.labels.length; ++index) {
		newDataset.data.push(rnd100());
	}

	config_resnet152_eval.data.datasets.push(newDataset);
	chart_resnet152_eval.update();
});

/*
 * #addData
 */
$("#addData").click(function(){
	if (config_resnet152_eval.data.datasets.length > 0){
		config_resnet152_eval.data.labels.push('dataset #' + config_resnet152_eval.data.labels.length);

		config_resnet152_eval.data.datasets.forEach(function(dataset){
			dataset.data.push(rnd100());
		});

		chart_resnet152_eval.update();
	}
});

/*
 * #removeDataset
 */
$("#removeDataset").click(function(){
	config_resnet152_eval.data.datasets.splice(0, 1);
	chart_resnet152_eval.update();
});

/*
 * #removeData
 */
$("#removeData").click(function(){
	config_resnet152_eval.data.labels.pop(); // remove the label first

	config_resnet152_eval.data.datasets.forEach(function(dataset){
		dataset.data.pop();
	});

	chart_resnet152_eval.update();
});
