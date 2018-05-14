const getFullData = require('./readText');
const synaptic = require("synaptic"); // this line is not needed in the browser
const { Layer, Network, Architect, Trainer } = synaptic;

const myPerceptron = new Architect.Perceptron(8,100, 2);
let trainer = new Trainer(myPerceptron);
let trainingSet = [];
let testSet = [];
let validationSet = [];
let fullData = getFullData([2014, 2015]);
let testData = getFullData([2017]);
let validationData = getFullData([2016]);

testData.forEach(params => {
  let conditionalGoalsA;
  let conditionalGoalsB;
  if (params[2].teamA == params[2].stadiumOwner) {
    conditionalGoalsA = params[0].homeGoals;
    conditionalGoalsB = params[0].outGoals;
  } else {
    conditionalGoalsA = params[0].outGoals;
    conditionalGoalsB = params[0].homeGoals;
  }
  testSet.push({
    input: [
      conditionalGoalsA,
      params[0].goalDif,
      params[0].goalsTaken,
      params[0].goalsTotal,
      conditionalGoalsB,
      params[1].goalDif,
      params[1].goalsTaken,
      params[1].goalsTotal
    ],
    output: [(params[2].matchGoalsTA * 0.1), (params[2].matchGoalsTB * 0.1)]
  });
});

validationData.forEach(params => {
  let conditionalGoalsA;
  let conditionalGoalsB;
  if (params[2].teamA == params[2].stadiumOwner) {
    conditionalGoalsA = params[0].homeGoals;
    conditionalGoalsB = params[0].outGoals;
  } else {
    conditionalGoalsA = params[0].outGoals;
    conditionalGoalsB = params[0].homeGoals;
  }
  validationSet.push({
    input: [
      conditionalGoalsA,
      params[0].goalDif,
      params[0].goalsTaken,
      params[0].goalsTotal,
      conditionalGoalsB,
      params[1].goalDif,
      params[1].goalsTaken,
      params[1].goalsTotal
    ],
    output: [(params[2].matchGoalsTA * 0.1), (params[2].matchGoalsTB * 0.1)]
  });
});

fullData.forEach(params => {
  let conditionalGoalsA;
  let conditionalGoalsB;
  if (params[2].teamA == params[2].stadiumOwner) {
    conditionalGoalsA = params[0].homeGoals;
    conditionalGoalsB = params[0].outGoals;    
  } else {
        conditionalGoalsA = params[0].outGoals;
        conditionalGoalsB = params[0].homeGoals;
  }
  trainingSet.push({
    input: [
      conditionalGoalsA,
      params[0].goalDif,
      params[0].goalsTaken,
      params[0].goalsTotal,
      conditionalGoalsB,
      params[1].goalDif,
      params[1].goalsTaken,
      params[1].goalsTotal
    ],
    output: [(params[2].matchGoalsTA * 0.1), (params[2].matchGoalsTB * 0.1)]
  });
});

trainer.train(trainingSet, {
  rate: 0.0005,
  iterations: 10,
  shuffle: true,
  cost: Trainer.cost.SQUARE_SUM,
  schedule: {
    every: 1, // repeat this task every 500 iterations
    do: function(data) {
      // custom log
      console.log(
        data.iterations +
          "    " +
          validationSet[data.iterations].output +
          "    " +
          myPerceptron.activate(validationSet[data.iterations].input) +
          "    " +
          //data.rate +
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


//myNetwork.setOptimize(false);

 //let neurons = myNetwork.neurons();

//for(let j =0; j<neurons.length; j++){
//  neuron.squash;
//}

//var customFunction = function(x){
//  return x
//};

// train the network - learn XOR

