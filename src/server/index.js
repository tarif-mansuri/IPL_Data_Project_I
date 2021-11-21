const iplServiceObject = require('./ipl');

const delivery= '/Users/tarif-5329/Documents/Jafri/IPL_Data_Project_I/src/data/deliveries.csv'
const matches = '/Users/tarif-5329/Documents/Jafri/IPL_Data_Project_I/src/data/matches.csv';

const csv=require('csvtojson');

csv()
.fromFile(matches)
.then((matchData)=>{
    csv().fromFile(delivery).then((deliveryData)=>{
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
        const top10Bowlers = iplServiceObject.gettop10BowlersByYear(matchData, deliveryData,2015);
        console.log(top10Bowlers);

        //console.log(matchData);
        //console.log(matchData[1]);

        //console.log(deliveryData[0]);
        //console.log(deliveryData);

    })
})