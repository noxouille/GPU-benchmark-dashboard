// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040_densenet161_eval = {
	'fp32': { 'GV100': 326, 'P5000': 187 },
  'fp16': { 'GV100': 540, 'P5000': 230 }
};

var tf180_densenet161_eval = {
	'fp32': { 'GV100': 0, 'P5000': 0 },
  'fp16': { 'GV100': 0, 'P5000': 0 }
};

var caffe2081_densenet161_eval = {
	'fp32': { 'GV100': 0, 'P5000': 0 },
  'fp16': { 'GV100': 0, 'P5000': 0 }
};

var color = Chart.helpers.color;
var data_eval = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.pytorch_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp32,
		data: [
			pytorch040_densenet161_eval["fp32"]["GV100"],
			pytorch040_densenet161_eval["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.pytorch_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp16,
		data: [
			pytorch040_densenet161_eval["fp16"]["GV100"],
			pytorch040_densenet161_eval["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.tf_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp32,
		data: [
			tf180_densenet161_eval["fp32"]["GV100"],
			tf180_densenet161_eval["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.tf_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp16,
		data: [
			tf180_densenet161_eval["fp16"]["GV100"],
			tf180_densenet161_eval["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.caffe2_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp32,
		data: [
			caffe2081_densenet161_eval["fp32"]["GV100"],
			caffe2081_densenet161_eval["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.caffe2_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp16,
		data: [
			caffe2081_densenet161_eval["fp16"]["GV100"],
			caffe2081_densenet161_eval["fp16"]["P5000"]
		]
	}]
};

var config_densenet161_eval = {
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
			text: 'densenet161 eval (images per sec)'
		}
	}
};

var chart_densenet161_eval = new Chart($("#chart-densenet161-eval"), config_densenet161_eval);

var GV100visible_densenet161_eval = true;
var P5000visible_densenet161_eval = true;

$("#showOnlyGV100-densenet161-eval").click(function(){
	if (P5000visible_densenet161_eval === true) { // remove P5000 graph
		config_densenet161_eval.data.labels.pop();
		config_densenet161_eval.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_densenet161_eval = !P5000visible_densenet161_eval;
	}
	if (GV100visible_densenet161_eval === false)	{ // show gv100 graph
		config_densenet161_eval.data.labels[0] = "GV100";
		config_densenet161_eval.data.datasets[0].data[0] = pytorch040_densenet161_eval["fp32"]["GV100"];
		config_densenet161_eval.data.datasets[1].data[0] = pytorch040_densenet161_eval["fp16"]["GV100"];
		config_densenet161_eval.data.datasets[2].data[0] = tf180_densenet161_eval["fp32"]["GV100"];
		config_densenet161_eval.data.datasets[3].data[0] = tf180_densenet161_eval["fp16"]["GV100"];
		config_densenet161_eval.data.datasets[4].data[0] = caffe2081_densenet161_eval["fp32"]["GV100"];
		config_densenet161_eval.data.datasets[5].data[0] = caffe2081_densenet161_eval["fp16"]["GV100"];
		GV100visible_densenet161_eval = !GV100visible_densenet161_eval;
	}
	chart_densenet161_eval.update();
});

$("#showOnlyP5000-densenet161-eval").click(function(){
	if (GV100visible_densenet161_eval === true) { // remove gv100 graph
		config_densenet161_eval.data.labels.splice(0, 1);
		config_densenet161_eval.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_densenet161_eval = !GV100visible_densenet161_eval;
	}
	if (P5000visible_densenet161_eval === false) { // show P5000 graph
		config_densenet161_eval.data.labels[0] = "P5000";
		config_densenet161_eval.data.datasets[0].data[0] = pytorch040_densenet161_eval["fp32"]["P5000"];
		config_densenet161_eval.data.datasets[1].data[0] = pytorch040_densenet161_eval["fp16"]["P5000"];
		config_densenet161_eval.data.datasets[2].data[0] = tf180_densenet161_eval["fp32"]["P5000"];
		config_densenet161_eval.data.datasets[3].data[0] = tf180_densenet161_eval["fp16"]["P5000"];
		config_densenet161_eval.data.datasets[4].data[0] = caffe2081_densenet161_eval["fp32"]["P5000"];
		config_densenet161_eval.data.datasets[5].data[0] = caffe2081_densenet161_eval["fp16"]["P5000"];
		P5000visible_densenet161_eval = !P5000visible_densenet161_eval;
	}
	chart_densenet161_eval.update();
});

$("#resetGraph-densenet161-eval").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_densenet161_eval.data.labels[0] = "GV100";
	config_densenet161_eval.data.datasets[0].data[0] = pytorch040_densenet161_eval["fp32"]["GV100"];
	config_densenet161_eval.data.datasets[1].data[0] = pytorch040_densenet161_eval["fp16"]["GV100"];
	config_densenet161_eval.data.datasets[2].data[0] = tf180_densenet161_eval["fp32"]["GV100"];
	config_densenet161_eval.data.datasets[3].data[0] = tf180_densenet161_eval["fp16"]["GV100"];
	config_densenet161_eval.data.datasets[4].data[0] = caffe2081_densenet161_eval["fp32"]["GV100"];
	config_densenet161_eval.data.datasets[5].data[0] = caffe2081_densenet161_eval["fp16"]["GV100"];
	config_densenet161_eval.data.labels[1] = "P5000";
	config_densenet161_eval.data.datasets[0].data[1] = pytorch040_densenet161_eval["fp32"]["P5000"];
	config_densenet161_eval.data.datasets[1].data[1] = pytorch040_densenet161_eval["fp16"]["P5000"];
	config_densenet161_eval.data.datasets[2].data[1] = tf180_densenet161_eval["fp32"]["P5000"];
	config_densenet161_eval.data.datasets[3].data[1] = tf180_densenet161_eval["fp16"]["P5000"];
	config_densenet161_eval.data.datasets[4].data[1] = caffe2081_densenet161_eval["fp32"]["P5000"];
	config_densenet161_eval.data.datasets[5].data[1] = caffe2081_densenet161_eval["fp16"]["P5000"];
	GV100visible_densenet161_eval = true;
	P5000visible_densenet161_eval = true;
	chart_densenet161_eval.update();
});

var show_densenet161eval_Legends = true;
$("#legends-densenet161-eval").click(function(){
	if (show_densenet161eval_Legends == true) {
		config_densenet161_eval.options.legend.display = false;
	} else {
		config_densenet161_eval.options.legend.display = true;
	}
	show_densenet161eval_Legends = !show_densenet161eval_Legends;
	chart_densenet161_eval.update();
});
