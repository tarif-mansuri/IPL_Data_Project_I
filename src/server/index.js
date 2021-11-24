const iplServiceObject = require('./ipl');

const delivery= '/Users/tarif-5329/Documents/Jafri/IPL_Data_Project_I/src/data/deliveries.csv'
const matches = '/Users/tarif-5329/Documents/Jafri/IPL_Data_Project_I/src/data/matches.csv';

const csv=require('csvtojson');

csv()
.fromFile(matches)
.then((matchData)=>{
    csv().fromFile(delivery).then((deliveryData)=>{
        //Part A
        //Question 1. Number of matches played per year for all the years in IPL.
        //const matchesPlayedPerYear = iplServiceObject.getMatchesPlayedPerYear(matchData);
        //console.log(matchesPlayedPerYear);

        //Question 2. Number of matches won per team per year in IPL.
        //const matcheswonPerTeamPerYear = iplServiceObject.getmatcheswonPerTeamPerYear(matchData);
        //console.log(matcheswonPerTeamPerYear);

        //Question 3. Extra runs conceded per team in the year 2016
        //const extraRunsPerTeamIn2016 = iplServiceObject.getExtraRunsPerTeamByYear(matchData,deliveryData,2016);
        //console.log(extraRunsPerTeamIn2016);

        //Question 4. Top 10 economical bowlers in the year 2015
        //const top10Bowlers = iplServiceObject.gettop10BowlersByYear(matchData, deliveryData,2015);
        //console.log(top10Bowlers);

        //Part B
        //Question 1. Find the number of times each team won the toss and also won the match
        //const CountTeamWonMatchAndToss = iplServiceObject.getCountTeamWonMatchAndToss(matchData);
        //console.log(CountTeamWonMatchAndToss);

        //Question 2. Find a player who has won the highest number of Player of the Match awards for each season
        //const playerOfTheMatchPerSeason = iplServiceObject.getplayerOfTheMatchPerSeason(matchData);
        //console.log(playerOfTheMatchPerSeason);

        //Question 3. Find the strike rate of a batsman for each season
        const strikeRateBySeasons = iplServiceObject.getstrikeRateBySeasons(matchData);
        console.log(strikeRateBySeasons);
        
        //Question 4. Find the highest number of times one player has been dismissed by another player
        //Question 5. Find the bowler with the best economy in super overs

        //console.log(matchData);
        //console.log(matchData[1]);

        //console.log(deliveryData[0]);
        //console.log(deliveryData);

        

    })
})