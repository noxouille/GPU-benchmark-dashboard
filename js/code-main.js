// TODO: is this efficient enough?
$("#tab1").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/pytorch-GV100-bench.txt");
$("#tab2").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/pytorch-P5000-bench.txt");
$("#tab3").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/caffe2-GV100-bench.txt");
$("#tab4").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/caffe2-P5000-bench.txt");
$("#tab5").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/tensorflow-GV100-bench.txt");
$("#tab6").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/tensorflow-P5000-bench.txt");

$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
