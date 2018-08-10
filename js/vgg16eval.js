// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040_vgg16_eval = {
	'fp32': { 'GV100': 573, 'P5000': 291 },
  'fp16': { 'GV100': 1221, 'P5000': 336 }
};

var tf180_vgg16_eval = {
	'fp32': { 'GV100': 565, 'P5000': 284 },
  'fp16': { 'GV100': 1095, 'P5000': 307 }
};

var caffe2081_vgg16_eval = {
	'fp32': { 'GV100': 324, 'P5000': 238 },
  'fp16': { 'GV100': 459, 'P5000': 276 }
};

var color = Chart.helpers.color;
var data_eval = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.pytorch_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp32,
		data: [
			pytorch040_vgg16_eval["fp32"]["GV100"],
			pytorch040_vgg16_eval["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.pytorch_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp16,
		data: [
			pytorch040_vgg16_eval["fp16"]["GV100"],
			pytorch040_vgg16_eval["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.tf_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp32,
		data: [
			tf180_vgg16_eval["fp32"]["GV100"],
			tf180_vgg16_eval["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.tf_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp16,
		data: [
			tf180_vgg16_eval["fp16"]["GV100"],
			tf180_vgg16_eval["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.caffe2_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp32,
		data: [
			caffe2081_vgg16_eval["fp32"]["GV100"],
			caffe2081_vgg16_eval["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.caffe2_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp16,
		data: [
			caffe2081_vgg16_eval["fp16"]["GV100"],
			caffe2081_vgg16_eval["fp16"]["P5000"]
		]
	}]
};

var config_vgg16_eval = {
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
			position: 'top',
			display: false
		},
		tooltips: {
			// 'point' for single data point,
			// 'index' for all data points in a group,
			// 'nearest' for single data point nearby.
		    mode: 'index',
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
			text: 'eval'
		}
	}
};

var chart_vgg16_eval = new Chart($("#chart-vgg16-eval"), config_vgg16_eval);

var GV100visible_vgg16_eval = true;
var P5000visible_vgg16_eval = true;

$("#showOnlyGV100-vgg16-eval").click(function(){
	if (P5000visible_vgg16_eval === true) { // remove P5000 graph
		config_vgg16_eval.data.labels.pop();
		config_vgg16_eval.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_vgg16_eval = !P5000visible_vgg16_eval;
	}
	if (GV100visible_vgg16_eval === false)	{ // show gv100 graph
		config_vgg16_eval.data.labels[0] = "GV100";
		config_vgg16_eval.data.datasets[0].data[0] = pytorch040_vgg16_eval["fp32"]["GV100"];
		config_vgg16_eval.data.datasets[1].data[0] = pytorch040_vgg16_eval["fp16"]["GV100"];
		config_vgg16_eval.data.datasets[2].data[0] = tf180_vgg16_eval["fp32"]["GV100"];
		config_vgg16_eval.data.datasets[3].data[0] = tf180_vgg16_eval["fp16"]["GV100"];
		config_vgg16_eval.data.datasets[4].data[0] = caffe2081_vgg16_eval["fp32"]["GV100"];
		config_vgg16_eval.data.datasets[5].data[0] = caffe2081_vgg16_eval["fp16"]["GV100"];
		GV100visible_vgg16_eval = !GV100visible_vgg16_eval;
	}
	chart_vgg16_eval.update();
});

$("#showOnlyP5000-vgg16-eval").click(function(){
	if (GV100visible_vgg16_eval === true) { // remove gv100 graph
		config_vgg16_eval.data.labels.splice(0, 1);
		config_vgg16_eval.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_vgg16_eval = !GV100visible_vgg16_eval;
	}
	if (P5000visible_vgg16_eval === false) { // show P5000 graph
		config_vgg16_eval.data.labels[0] = "P5000";
		config_vgg16_eval.data.datasets[0].data[0] = pytorch040_vgg16_eval["fp32"]["P5000"];
		config_vgg16_eval.data.datasets[1].data[0] = pytorch040_vgg16_eval["fp16"]["P5000"];
		config_vgg16_eval.data.datasets[2].data[0] = tf180_vgg16_eval["fp32"]["P5000"];
		config_vgg16_eval.data.datasets[3].data[0] = tf180_vgg16_eval["fp16"]["P5000"];
		config_vgg16_eval.data.datasets[4].data[0] = caffe2081_vgg16_eval["fp32"]["P5000"];
		config_vgg16_eval.data.datasets[5].data[0] = caffe2081_vgg16_eval["fp16"]["P5000"];
		P5000visible_vgg16_eval = !P5000visible_vgg16_eval;
	}
	chart_vgg16_eval.update();
});

$("#resetGraph-vgg16-eval").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_vgg16_eval.data.labels[0] = "GV100";
	config_vgg16_eval.data.datasets[0].data[0] = pytorch040_vgg16_eval["fp32"]["GV100"];
	config_vgg16_eval.data.datasets[1].data[0] = pytorch040_vgg16_eval["fp16"]["GV100"];
	config_vgg16_eval.data.datasets[2].data[0] = tf180_vgg16_eval["fp32"]["GV100"];
	config_vgg16_eval.data.datasets[3].data[0] = tf180_vgg16_eval["fp16"]["GV100"];
	config_vgg16_eval.data.datasets[4].data[0] = caffe2081_vgg16_eval["fp32"]["GV100"];
	config_vgg16_eval.data.datasets[5].data[0] = caffe2081_vgg16_eval["fp16"]["GV100"];
	config_vgg16_eval.data.labels[1] = "P5000";
	config_vgg16_eval.data.datasets[0].data[1] = pytorch040_vgg16_eval["fp32"]["P5000"];
	config_vgg16_eval.data.datasets[1].data[1] = pytorch040_vgg16_eval["fp16"]["P5000"];
	config_vgg16_eval.data.datasets[2].data[1] = tf180_vgg16_eval["fp32"]["P5000"];
	config_vgg16_eval.data.datasets[3].data[1] = tf180_vgg16_eval["fp16"]["P5000"];
	config_vgg16_eval.data.datasets[4].data[1] = caffe2081_vgg16_eval["fp32"]["P5000"];
	config_vgg16_eval.data.datasets[5].data[1] = caffe2081_vgg16_eval["fp16"]["P5000"];
	GV100visible_vgg16_eval = true;
	P5000visible_vgg16_eval = true;
	chart_vgg16_eval.update();
});

$("#legends-vgg16-eval").click(function(){
	if (config_vgg16_eval.options.legend.display == true) {
		config_vgg16_eval.options.legend.display = false;
	} else {
		config_vgg16_eval.options.legend.display = true;
	}
	chart_vgg16_eval.update();
});
