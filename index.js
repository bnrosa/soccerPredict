var synaptic = require("synaptic"); // this line is not needed in the browser
const { Layer, Network } = synaptic;

var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// train the network - learn XOR

var learningRate = .3;

for (var i = 0; i < 20000; i++) {
  // Para gols feitos pelo São Paulo contra o Atlético-MG
  myNetwork.activate([0,0]);
  myNetwork.propagate(learningRate, [0]);

  // Para gols feitos pelo Atlético-MG contra o São Paulo
  myNetwork.activate([0,1]);
  myNetwork.propagate(learningRate, [1]);

}

console.log(myNetwork.activate([0, 0])); 