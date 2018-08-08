// TODO: can we make this more efficient?
$("#tab1").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/pytorch-GV100-bench.txt", function(content) {
  hljs.highlightBlock(this);
});

$("#tab2").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/pytorch-P5000-bench.txt", function(content) {
  hljs.highlightBlock(this);
});

$("#tab3").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/caffe2-GV100-bench.txt", function(content) {
  hljs.highlightBlock(this);
});

$("#tab4").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/caffe2-P5000-bench.txt", function(content) {
  hljs.highlightBlock(this);
});

$("#tab5").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/tensorflow-GV100-bench.txt", function(content) {
  hljs.highlightBlock(this);
});

$("#tab6").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/tensorflow-P5000-bench.txt", function(content) {
  hljs.highlightBlock(this);
});
