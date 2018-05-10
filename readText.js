var fs = require("fs");

function myfind(array, round, team) {
    let value = null;
    array.forEach((x) => {
        if (x.round == round && (x.player1 == team | x.player2 == team))
            value = x;
        else
            return false;
    });
    return value;
}

function getGames(year){

    let games = [];
    let content = fs.readFileSync(`data/${year}.txt`, "utf8");

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

module.exports = function getParams(round, teamA, teamB, year, range){
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
        matchGoalsTA: 0,
        matchGoalsTB: 0
    }
    if(round - range < 1)
        return "Range too low";
    //Team 1
    for(i=1; i<=range; i++){
        roundReal = "" + (round - i) + "ª";
        game = myfind(games, roundReal, teamA)
        if(teamA == game.player1){
            tAStats.homeGoals += parseInt(game.p1Score);
            tBStats.enemyGoalsTaken += parseInt(game.p2Score);
            tAStats.goalDif += (parseInt(game.p1Score) - parseInt(game.p2Score));
            tAStats.goalsTotal += parseInt(game.p1Score);   
        }
        else{
            tAStats.outGoals += parseInt(game.p2Score);
            tBStats.enemyGoalsTaken += parseInt(game.p1Score);
            tAStats.goalDif += (parseInt(game.p2Score) - parseInt(game.p1Score));
            tAStats.goalsTotal += parseInt(game.p2Score);
        }
    }
    //Team 2
    for (i = 1; i < range; i++) {
        roundReal = ''+(round - i)+'ª';
        game = myfind(games, roundReal, teamB)
       if (teamB == game.player1) {
           tBStats.homeGoals += parseInt(game.p1Score);
           tAStats.enemyGoalsTaken += parseInt(game.p2Score);
           tBStats.goalDif += (parseInt(game.p1Score) - parseInt(game.p2Score));
           tBStats.goalsTotal += parseInt(game.p1Score);
       } else {
           tBStats.outGoals += parseInt(game.p2Score);
           tAStats.enemyGoalsTaken += parseInt(game.p1Score);
           tBStats.goalDif += (parseInt(game.p2Score) - parseInt(game.p1Score));
           tBStats.goalsTotal += parseInt(game.p2Score);
       }
    }
    roundReal = ''+round+'ª';
    game = myfind(games, roundReal, teamA);
    if(game.player1 == teamA){
        match.stadiumOwner = teamA;
        match.matchGoalsTA = parseInt(game.p1Score);
        match.matchGoalsTB = parseInt(game.p2Score);
    }
    else{
        match.stadiumOwner = teamB;
        match.matchGoalsTA = parseInt(game.p2Score);
        match.matchGoalsTB = parseInt(game.p1Score);
    }
    const params = [tAStats, tBStats, match];
    return params;
}

//let myGames = getGames('2013');
//let params = getParams(22, 'Cruzeiro', 'Botafogo', 2013, 5);
//console.log(params);