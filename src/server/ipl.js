
const iplUtilObject = require('./iplUtil');
function getMatchesPlayedPerYear(matchDataArray){
    const matchesPlayedPerYear = {};
    matchDataArray.map(element=>{
        if(element.season in matchesPlayedPerYear){
            matchesPlayedPerYear[element.season] = Number(matchesPlayedPerYear[element.season])+1;
        }else{
            matchesPlayedPerYear[element.season] = 1;
        }
        return true;
    })
    return matchesPlayedPerYear;
}

function getmatcheswonPerTeamPerYear(matchDataArray){
    const matchesWonPerTeamPerYear = {};//"winner":"Sunrisers Hyderabad"
    matchDataArray.map((element)=>{
        if(!(element.winner in matchesWonPerTeamPerYear)){
            matchesWonPerTeamPerYear[element.winner]={};
        }
        let teamObject = matchesWonPerTeamPerYear[element.winner];
        if(!(element.season in teamObject)){
            teamObject[element.season] = 1;
        }else{
            teamObject[element.season] = Number(teamObject[element.season])+1;
        }
        matchesWonPerTeamPerYear[element.winner] = teamObject;
        return true;
    })
    return matchesWonPerTeamPerYear;
}

function getExtraRunsPerTeamByYear(matchDataArray,deliveriesArray,year){
    const extraRunsPerTeamIn2016 = {};
    iplUtilObject.getDataByYear(matchDataArray, year).map((element)=>{
        const id = element.id;
        deliveriesArray.map((e)=>{
            if(e.match_id == id){
                if(!(e.batting_team in extraRunsPerTeamIn2016)){
                    extraRunsPerTeamIn2016[e.batting_team] = Number(e.extra_runs);
                }else{
                    extraRunsPerTeamIn2016[e.batting_team] = extraRunsPerTeamIn2016[e.batting_team] + Number(e.extra_runs);
                }
            }
            return true;
        })
    })
    return extraRunsPerTeamIn2016;
}

function gettop10BowlersByYear(matchData, deliveryData, year){
    const bowlersData = {};
    const matchDataInYear = iplUtilObject.getDataByYear(matchData, year);
    matchDataInYear.map((element)=>{
        const id = element.id;
        deliveryData.map((element)=>{
            if(element.match_id==id){
                if(!(element.bowler in bowlersData)){
                    bowlersData[element.bowler] = {'Balls':1, 'Runs':Number(element.total_runs)};
                }else{
                    const obj = bowlersData[element.bowler];
                    obj.Balls +=1;
                    obj.Runs +=  Number(element.total_runs);
                }
            }
        })
    })
    const bowlersDataArray = Object.keys(bowlersData).map((element)=>{
        const e = {'name':element,'data':bowlersData[element]};
       return e; 
    })
    return bowlersDataArray.map((element)=>{
        const obj = element.data;
        //obj.economy = obj.Runs/((obj.Balls/6+(obj.Balls%6)*0.1));
        obj.economy = obj.Runs/((obj.Balls/6)+((obj.Balls%6)*0.1));
        element.data = obj;
        return element
     }).sort((a,b)=>{
         if(a.data.economy > b.data.economy)
            {
                return 1;
            }else if(a.data.economy < b.data.economy){
                return -1;
            }else{
                return 0;
            }
     }).slice(0,10)
}

module.exports = {getMatchesPlayedPerYear, getmatcheswonPerTeamPerYear,getExtraRunsPerTeamByYear,gettop10BowlersByYear}
