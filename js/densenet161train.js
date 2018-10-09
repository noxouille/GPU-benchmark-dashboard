// Put your data here
var GPU = ['GV100', 'P5000'];

var pytorch040_densenet161_train = {
	'fp32': { 'GV100': 96, 'P5000': 53 },
  'fp16': { 'GV100': 138, 'P5000': 59 }
};

var tf180_densenet161_train = {
	'fp32': { 'GV100': 0, 'P5000': 0 },
  'fp16': { 'GV100': 0, 'P5000': 0 }
};

var caffe2081_densenet161_train = {
	'fp32': { 'GV100': 0, 'P5000': 0 },
  'fp16': { 'GV100': 0, 'P5000': 0 }
};

var color = Chart.helpers.color;
var data_train = {
	labels: GPU,
	datasets: [{
		label: 'PyTorch 0.4.0 fp32',
		backgroundColor: color(colorSet.pytorch_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp32,
		data: [
			pytorch040_densenet161_train["fp32"]["GV100"],
			pytorch040_densenet161_train["fp32"]["P5000"]
		]
	}, {
		label: 'PyTorch 0.4.0 fp16',
		backgroundColor: color(colorSet.pytorch_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.pytorch_fp16,
		data: [
			pytorch040_densenet161_train["fp16"]["GV100"],
			pytorch040_densenet161_train["fp16"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp32',
		backgroundColor: color(colorSet.tf_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp32,
		data: [
			tf180_densenet161_train["fp32"]["GV100"],
			tf180_densenet161_train["fp32"]["P5000"]
		]
	}, {
		label: 'TensorFlow 1.8.0 fp16',
		backgroundColor: color(colorSet.tf_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.tf_fp16,
		data: [
			tf180_densenet161_train["fp16"]["GV100"],
			tf180_densenet161_train["fp16"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp32',
		backgroundColor: color(colorSet.caffe2_fp32).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp32,
		data: [
			caffe2081_densenet161_train["fp32"]["GV100"],
			caffe2081_densenet161_train["fp32"]["P5000"]
		]
	}, {
		label: 'Caffe2 0.8.1 fp16',
		backgroundColor: color(colorSet.caffe2_fp16).alpha(0.3).rgbString(),
		borderColor: colorSet.caffe2_fp16,
		data: [
			caffe2081_densenet161_train["fp16"]["GV100"],
			caffe2081_densenet161_train["fp16"]["P5000"]
		]
	}]
};

var config_densenet161_train = {
  type: 'bar',
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
			text: 'train'
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true
				}
			}]
		}
	}
};

var chart_densenet161_train = new Chart($("#chart-densenet161-train"), config_densenet161_train);

var GV100visible_densenet161_train = true;
var P5000visible_densenet161_train = true;

$("#showOnlyGV100-densenet161-train").click(function(){
	if (P5000visible_densenet161_train === true) { // remove P5000 graph
		config_densenet161_train.data.labels.pop();
		config_densenet161_train.data.datasets.forEach(function(dataset){
			dataset.data.pop();
		});
		P5000visible_densenet161_train = !P5000visible_densenet161_train;
	}
	if (GV100visible_densenet161_train === false)	{ // show gv100 graph
		config_densenet161_train.data.labels[0] = "GV100";
		config_densenet161_train.data.datasets[0].data[0] = pytorch040_densenet161_train["fp32"]["GV100"];
		config_densenet161_train.data.datasets[1].data[0] = pytorch040_densenet161_train["fp16"]["GV100"];
		config_densenet161_train.data.datasets[2].data[0] = tf180_densenet161_train["fp32"]["GV100"];
		config_densenet161_train.data.datasets[3].data[0] = tf180_densenet161_train["fp16"]["GV100"];
		config_densenet161_train.data.datasets[4].data[0] = caffe2081_densenet161_train["fp32"]["GV100"];
		config_densenet161_train.data.datasets[5].data[0] = caffe2081_densenet161_train["fp16"]["GV100"];
		GV100visible_densenet161_train = !GV100visible_densenet161_train;
	}
	chart_densenet161_train.update();
});

$("#showOnlyP5000-densenet161-train").click(function(){
	if (GV100visible_densenet161_train === true) { // remove gv100 graph
		config_densenet161_train.data.labels.splice(0, 1);
		config_densenet161_train.data.datasets.forEach(function(dataset){
			dataset.data.splice(0, 1);
		});
		GV100visible_densenet161_train = !GV100visible_densenet161_train;
	}
	if (P5000visible_densenet161_train === false) { // show P5000 graph
		config_densenet161_train.data.labels[0] = "P5000";
		config_densenet161_train.data.datasets[0].data[0] = pytorch040_densenet161_train["fp32"]["P5000"];
		config_densenet161_train.data.datasets[1].data[0] = pytorch040_densenet161_train["fp16"]["P5000"];
		config_densenet161_train.data.datasets[2].data[0] = tf180_densenet161_train["fp32"]["P5000"];
		config_densenet161_train.data.datasets[3].data[0] = tf180_densenet161_train["fp16"]["P5000"];
		config_densenet161_train.data.datasets[4].data[0] = caffe2081_densenet161_train["fp32"]["P5000"];
		config_densenet161_train.data.datasets[5].data[0] = caffe2081_densenet161_train["fp16"]["P5000"];
		P5000visible_densenet161_train = !P5000visible_densenet161_train;
	}
	chart_densenet161_train.update();
});

$("#resetGraph-densenet161-train").click(function(){
	// TODO: Can we make this more efficient? especially for more datasets
	config_densenet161_train.data.labels[0] = "GV100";
	config_densenet161_train.data.datasets[0].data[0] = pytorch040_densenet161_train["fp32"]["GV100"];
	config_densenet161_train.data.datasets[1].data[0] = pytorch040_densenet161_train["fp16"]["GV100"];
	config_densenet161_train.data.datasets[2].data[0] = tf180_densenet161_train["fp32"]["GV100"];
	config_densenet161_train.data.datasets[3].data[0] = tf180_densenet161_train["fp16"]["GV100"];
	config_densenet161_train.data.datasets[4].data[0] = caffe2081_densenet161_train["fp32"]["GV100"];
	config_densenet161_train.data.datasets[5].data[0] = caffe2081_densenet161_train["fp16"]["GV100"];
	config_densenet161_train.data.labels[1] = "P5000";
	config_densenet161_train.data.datasets[0].data[1] = pytorch040_densenet161_train["fp32"]["P5000"];
	config_densenet161_train.data.datasets[1].data[1] = pytorch040_densenet161_train["fp16"]["P5000"];
	config_densenet161_train.data.datasets[2].data[1] = tf180_densenet161_train["fp32"]["P5000"];
	config_densenet161_train.data.datasets[3].data[1] = tf180_densenet161_train["fp16"]["P5000"];
	config_densenet161_train.data.datasets[4].data[1] = caffe2081_densenet161_train["fp32"]["P5000"];
	config_densenet161_train.data.datasets[5].data[1] = caffe2081_densenet161_train["fp16"]["P5000"];
	GV100visible_densenet161_train = true;
	P5000visible_densenet161_train = true;
	chart_densenet161_train.update();
});

$("#legends-densenet161-train").click(function(){
	if (config_densenet161_train.options.legend.display == true) {
		config_densenet161_train.options.legend.display = false;
	} else {
		config_densenet161_train.options.legend.display = true;
	}
	chart_densenet161_train.update();
});
