var fs = require("fs");

function getGames(year){

    let games = [];
    let content = fs.readFileSync(`${year}.txt`, "utf8");

    lines = content.split("\n").forEach(function(line) {
      let elements = line.split("	");
      games.push({
        player1: elements[3],
        player2: elements[7],
        p1Score: elements[4],
        p2Score: elements[6],
        round: elements[0]
      });
    });
    return games;
}

function getParams(round, teamA, teamB, year, range){
    games = getGames(year);
    const tAStats = {
        outGoals:0,
        homeGoals:0,
        goalDif:0,
        enemyGoalsTaken:0,
        goalsTotal:0
    };
    const tBStats = {
        outGoals: 0,
        homeGoals: 0,
        goalDif: 0,
        enemyGoalsTaken: 0,
        goalsTotal: 0        
    };
    const match = {
        stadiumOwner: '',
        matchGoalsT2: 0,
        matchGoalsT1: 0
    }
    if(round - range < 1)
        return "Range too low";
    //Team 1
    for(i=1; i<=range; i++){
        roundReal = "" + (round - i) + "ª";
        game = games.find(x => x.round == (roundReal - i) && (x.player1 == teamA | x.player2 == teamA));
        if(teamA == game.player1){
            tAStats.homeGoals += game.p1Score;
            tBStats.enemyGoalsTaken += game.p2Score;
            tAStats.goalDif += (game.p1Score - game.p2Score);
            tAStats.goalsTotal += game.p1Score;   
        }
        else{
            tAStats.homeGoals += game.p2Score;
            tBStats.enemyGoalsTaken += game.p1Score;
            tAStats.goalDif += (game.p2Score - game.p1Score);
            tAStats.goalsTotal += game.p2Score;
        }
    }
    //Team 2
    for (i = 1; i < range; i++) {
        roundReal = ''+(round - i)+'ª';
        game = games.find(x => x.round == (roundReal) && (x.player1 == teamB | x.player2 == teamB));
        console.log(game);
        if (teamB == game.player1) {
            tBStats.homeGoals += game.p1Score;
            tAStats.enemyGoalsTaken += game.p2Score;
            tBStats.goalDif += (game.p1Score - game.p2Score);
            tBStats.goalsTotal += game.p1Score;
        } else {
            tBStats.homeGoals += game.p2Score;
            tAStats.enemyGoalsTaken += game.p1Score;
            tBStats.goalDif += (game.p2Score - game.p1Score);
            tBStats.goalsTotal += game.p2Score;
        }
    }
    game = games.find(x => x.round == round && ((x.player1 == teamB && x.player2 == teamA) | (x.player1 == teamA && x.player2 == teamB)) );
    if(game.player1 == teamA){
        match.stadiumOwner = teamA;
        match.matchGoalsT1 = game.tAStats;
        match.matchGoalsT2 = game.tBStats;
    }
    else{
        match.stadiumOwner = teamB;
        match.matchGoalsT1 = game.tBStats;
        match.matchGoalsT2 = game.tAStats;
    }
    const params = [tAStats, tBStats, match];
    return params;
}

let myGames = getGames('2003');
console.log(myGames[300].round);
console.log(myGames[2].player1);
console.log(myGames[45].player2);
console.log(myGames[24].p1Score);
console.log(myGames[1].p2Score);

let params = getParams(5, 'VASCO', 'Corinthians', 2003, 3);
console.log(params[0].goalsTotal);
console.log(params[1].goalsTotal);
console.log(params[2].stadiumOwner);