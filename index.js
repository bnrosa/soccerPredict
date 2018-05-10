const readText = require('readText');
const synaptic = require("synaptic"); // this line is not needed in the browser
const { Layer, Network } = synaptic;

let inputLayer = new Layer();
let hiddenLayer = new Layer(3);
let outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// train the network - learn XOR

const learningRate = .3;

let params = readText.

for (let i = 0; i < 20000; i++) {
  // Para gols feitos pelo São Paulo contra o Atlético-MG
  myNetwork.activate([0,0]);
  myNetwork.propagate(learningRate, [0]);

  // Para gols feitos pelo Atlético-MG contra o São Paulo
  myNetwork.activate([0,1]);
  myNetwork.propagate(learningRate, [1]);

}

console.log(myNetwork.activate([0, 0])); 