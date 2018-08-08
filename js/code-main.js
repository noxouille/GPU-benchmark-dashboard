hljs.initHighlightingOnLoad();

addEventListener('load', function() {
  var code = document.querySelector('#code');
  var worker = new Worker('worker.js');
  worker.onmessage = function(event) { code.innerHTML = event.data; }
  worker.postMessage(code.textContent);
})

$("#tab1").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/pytorch-GV100-bench.txt", function(content) {
  document.getElementById("tab1").innerHTML = content
});

$("#tab2").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/pytorch-P5000-bench.txt", function(content) {
  document.getElementById("tab2").innerHTML = content
});

$("#tab3").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/caffe2-GV100-bench.txt", function(content) {
  document.getElementById("tab3").innerHTML = content
});

$("#tab4").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/caffe2-P5000-bench.txt", function(content) {
  document.getElementById("tab4").innerHTML = content
});

$("#tab5").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/tensorflow-GV100-bench.txt", function(content) {
  document.getElementById("tab5").innerHTML = content
});

$("#tab6").load("https://raw.githubusercontent.com/noxouille/deep-learning-benchmark/master/results/tensorflow-P5000-bench.txt", function(content) {
  document.getElementById("tab6").innerHTML = content
});
