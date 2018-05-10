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

const learningRate = 0.0001;
const teamA = 'Cruzeiro';
const teamB = 'Botafogo';
const params = getParams(22, teamA, teamB, 2013, 5);
console.log(params);

const outGoalsA = params[0].outGoals;
const homeGoalsA = params[0].homeGoals;
const goalDifA = params[0].goalDif;
const enemyGoalsTakenA = params[0].enemyGoalsTaken;
const goalsTotalA = params[0].goalsTotal;

const outGoalsB = params[1].outGoals;
const homeGoalsB = params[1].homeGoals;
const goalDifB = params[1].goalDif;
const enemyGoalsTakenB = params[1].enemyGoalsTaken;
const goalsTotalB = params[1].goalsTotal;

const matchGoalsTA = params[2].matchGoalsTA;
const matchGoalsTB = params[2].matchGoalsTB;
const stadiumOwner = params[2].stadiumOwner;

for (let i = 0; i < 2000000; i++) {
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