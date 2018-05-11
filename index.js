const getParams = require('./readText');
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

//myNetwork.setOptimize(false);

//let neurons = myNetwork.neurons();

//for(let j =0; j<neurons.length; j++){
//  neuron.squash;
//}

//var customFunction = function(x){
//  return x
//};

// train the network - learn XOR

let learningRate = 0.0001;
let teamA = 'Cruzeiro';
let teamB = 'Botafogo';
let year = 2013;
let range = 5;
let round = 22;

//for(let j = range+1; j < 38; j++){
  let params = getParams(round, teamA, teamB, year, range);
  console.log(params);

  let outGoalsA = params[0].outGoals;
  let homeGoalsA = params[0].homeGoals;
  let goalDifA = params[0].goalDif;
  let enemyGoalsTakenA = params[0].enemyGoalsTaken;
  let goalsTotalA = params[0].goalsTotal;

  let outGoalsB = params[1].outGoals;
  let homeGoalsB = params[1].homeGoals;
  let goalDifB = params[1].goalDif;
  let enemyGoalsTakenB = params[1].enemyGoalsTaken;
  let goalsTotalB = params[1].goalsTotal;

  let matchGoalsTA = params[2].matchGoalsTA;
  let matchGoalsTB = params[2].matchGoalsTB;
  let stadiumOwner = params[2].stadiumOwner;

  for (let i = 0; i < 200000; i++) {
    let conditionalGoalsA;
    let conditionalGoalsB;
    if(stadiumOwner == teamA){
      conditionalGoalsA = homeGoalsA;
      conditionalGoalsB = outGoalsB;
    }
    else{
      conditionalGoalsA = outGoalsA;
      conditionalGoalsB = homeGoalsB;
    }
    // Para gols feitos pelo São Paulo contra o Atlético-MG
    myNetwork.activate([conditionalGoalsA, goalDifA, enemyGoalsTakenA, goalsTotalA]);
    myNetwork.propagate(learningRate, [(matchGoalsTA * 0.1)]);

    // Para gols feitos pelo Atlético-MG contra o São Paulo
    myNetwork.activate([conditionalGoalsB, goalDifB, enemyGoalsTakenB, goalsTotalB]);
    myNetwork.propagate(learningRate, [(matchGoalsTB * 0.1)]);

  }
//}
let conditionalGoalsA;
let conditionalGoalsB;
if (stadiumOwner == teamA) {
  conditionalGoalsA = homeGoalsA;
  conditionalGoalsB = outGoalsB;
} else {
  conditionalGoalsA = outGoalsA;
  conditionalGoalsB = homeGoalsB;
}

console.log(myNetwork.activate([conditionalGoalsB, goalDifB, enemyGoalsTakenB, goalsTotalB]));
console.log(myNetwork.activate([conditionalGoalsA, goalDifA, enemyGoalsTakenA, goalsTotalA]));
