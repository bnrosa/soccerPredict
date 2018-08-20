const getFullData2 = require('./readText');
const synaptic = require("synaptic"); // this line is not needed in the browser
const { Layer, Network, Architect, Trainer } = synaptic;

const myPerceptron = new Architect.Perceptron(3,1000, 1);
let trainer = new Trainer(myPerceptron);
let trainingSet = [];
let testSet = [];
let validationSet = [];
// let fullData = getFullData([2014, 2015]);
// let testData = getFullData([2017]);
// let validationData = getFullData([2016]);

let scoresFull = getFullData2(2014, 'Fluminense');
let scores = scoresFull.ts;
let midAndTotal = calcMidAndTotal(scores);
let mid = midAndTotal.mid;
let total = midAndTotal.total;
console.log(mid.length);
console.log(total.length);

for(i = 0; i < (scores.length -1); i++){
  trainingSet.push({
    input: [
      scores[i],
      mid[i],
      total[i]
    ],
    output: [
      scores[i+1]
    ]
  });
}

trainer.train(trainingSet, {
  rate: 0.0005,
  iterations: 30,
  shuffle: true,
  cost: Trainer.cost.CROSS_ENTROPY,
  schedule: {
    every: 1, // repeat this task every 500 iterations
    do: function(data) {
      // custom log
      console.log(
        data.iterations +
          "    " +
          trainingSet[data.iterations].output +
          "    " +
          myPerceptron.activate(trainingSet[data.iterations].input) +
          "    " +          
          data.error
      );
      //console.log(
      //  " ",
      // data.error,
      //  " ",
      //  data.iterations,
      //  " ",
      //  data.rate
      //);
    }
  }
});

function calcMidAndTotal(scores){
  const mid = [];
  const total = [];
  let buffer;
  for(let i =0; i< scores.length; i++){
    if(i>0){
      buffer = 0;
      for(j = 0; j <i; j++){
        buffer += scores[j];
      }
      mid.push(buffer/(i + 1));
      total.push(buffer);
    }
    else{
      mid.push(scores[i]);
      total.push(scores[i]);
    }
  }
  return {mid: mid, total: total};
}


//myNetwork.setOptimize(false);

 //let neurons = myNetwork.neurons();

//for(let j =0; j<neurons.length; j++){
//  neuron.squash;
//}

//var customFunction = function(x){
//  return x
//};

// train the network - learn XOR

