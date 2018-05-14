const getFullData = require('./readText');
const synaptic = require("synaptic"); // this line is not needed in the browser
const { Layer, Network, Architect, Trainer } = synaptic;

const myPerceptron = new Architect.Perceptron(10,8, 2);
let trainer = new Trainer(myPerceptron);
let trainingSet = [];
let fullData = getFullData([2016, 2017]);

fullData.forEach(params => {
  trainingSet.push({
    input: [
      params[0].outGoals,
      params[0].homeGoals,
      params[0].goalDif,
      params[0].goalsTaken,
      params[0].goalsTotal,
      params[1].outGoals,
      params[1].homeGoals,
      params[1].goalDif,
      params[1].goalsTaken,
      params[1].goalsTotal
    ],
    output: [(params[2].matchGoalsTA * 0.1), (params[2].matchGoalsTB * 0.1)]
  });
});

trainer.train(trainingSet, {
  rate: 0.01,
  iterations: 20000,
  cost: Trainer.cost.CROSS_ENTROPY,
  schedule: {
    every: 500, // repeat this task every 500 iterations
    do: function(data) {
      // custom log
      console.log(
        "error",
        data.error,
        "iterations",
        data.iterations,
        "rate",
        data.rate
      );
    }
  }
});


//myNetwork.setOptimize(false);

 //let neurons = myNetwork.neurons();

//for(let j =0; j<neurons.length; j++){
//  neuron.squash;
//}

//var customFunction = function(x){
//  return x
//};

// train the network - learn XOR

