var fs = require("fs");
  function myfind(array, round, team) {
    let value = null;
    array.forEach(x => {
      if (x.round == round && (x.player1 == team) | (x.player2 == team))
        value = x;
      else return false;
    });
    return value;
  }

  function getTeams(games){
    let teams = [];
    games.forEach((element) => {
      if(!teams.includes(element.player1)){
        teams.push(element.player1);
      }
      if (!teams.includes(element.player2)) {
        teams.push(element.player2);
      }
    });
    return teams;
  }

  function getGames(year) {
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

  function getParams(round, teamA, teamB, games, range) {
    const tAStats = {
      outGoals: 0,
      homeGoals: 0,
      goalDif: 0,
      goalsTaken: 0,
      goalsTotal: 0
    };
    const tBStats = {
      outGoals: 0,
      homeGoals: 0,
      goalDif: 0,
      goalsTaken: 0,
      goalsTotal: 0
    };
    const match = {
      stadiumOwner: "",
      matchGoalsTA: 0,
      matchGoalsTB: 0
    };
    if (round - range < 1) return "Range too low";
    //Team 1
    for (i = 1; i <= range; i++) {
      roundReal = "" + (round - i) + "ª";
      game = myfind(games, roundReal, teamA);
      if (teamA == game.player1) {
        tAStats.homeGoals += parseInt(game.p1Score);
        tAStats.goalsTaken += parseInt(game.p2Score);
        tAStats.goalDif += parseInt(game.p1Score) - parseInt(game.p2Score);
        tAStats.goalsTotal += parseInt(game.p1Score);
      } else {
        tAStats.outGoals += parseInt(game.p2Score);
        tAStats.goalsTaken += parseInt(game.p1Score);
        tAStats.goalDif += parseInt(game.p2Score) - parseInt(game.p1Score);
        tAStats.goalsTotal += parseInt(game.p2Score);
      }
    }
    //Team 2
    for (i = 1; i < range; i++) {
      roundReal = "" + (round - i) + "ª";
      game = myfind(games, roundReal, teamB);
      if (teamB == game.player1) {
        tBStats.homeGoals += parseInt(game.p1Score);
        tBStats.goalsTaken += parseInt(game.p2Score);
        tBStats.goalDif += parseInt(game.p1Score) - parseInt(game.p2Score);
        tBStats.goalsTotal += parseInt(game.p1Score);
      } else {
        tBStats.outGoals += parseInt(game.p2Score);
        tBStats.goalsTaken += parseInt(game.p1Score);
        tBStats.goalDif += parseInt(game.p2Score) - parseInt(game.p1Score);
        tBStats.goalsTotal += parseInt(game.p2Score);
      }
    }
    roundReal = "" + round + "ª";
    game = myfind(games, roundReal, teamA);
    if (game.player1 == teamA) {
      match.stadiumOwner = teamA;
      match.matchGoalsTA = parseInt(game.p1Score);
      match.matchGoalsTB = parseInt(game.p2Score);
    } else {
      match.stadiumOwner = teamB;
      match.matchGoalsTA = parseInt(game.p2Score);
      match.matchGoalsTB = parseInt(game.p1Score);
    }
    const params = [tAStats, tBStats, match];
    return params;
  }

  function getFullData(years){
    let totalParams = [];
    years.forEach( (element) => {
      let games = getGames(element);
      for(let i =0; i < games.length; i++){
        let round = games[i].round;
        let roundNum = parseInt(round.charAt(0));
        if(roundNum > 4){
          console.log(i, games[i].player1, games[i].player2, games, 3);
          let params = getParams(i, games[i].player1, games[i].player2, games, 3);
          totalParams.push(params);
        }
      }
    });
    return totalParams;
  }

  let years = [2016, 2017];
  let fullData = getFullData(years);

//let myGames = getGames('2013');
//let params = getParams(22, 'Cruzeiro', 'Botafogo', 2013, 5);

