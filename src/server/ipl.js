
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

function getCountTeamWonMatchAndToss(matchData){
    let teamWinDataObject = {};
    matchData.map((element)=>{
        if(element.toss_winner==element.winner){
            if(!(element.winner in teamWinDataObject)){
                teamWinDataObject[element.winner] = 1;
            }else{
                teamWinDataObject[element.winner]+=1;
            }
        }
        return;
    })
    return teamWinDataObject;
}

function getplayerOfTheMatchPerSeason(matchData){
    const dataPlayerOfTheMatch = {};
    matchData.map((element)=>{
        if(!(element.season in dataPlayerOfTheMatch)){
            dataPlayerOfTheMatch[element.season] = {};
        }
        const playerOfMatch = element.player_of_match;
        const seasonObject = dataPlayerOfTheMatch[element.season];
        if(!(playerOfMatch in seasonObject)){
            seasonObject[playerOfMatch] = 1;
        }else{
            seasonObject[playerOfMatch]+=1;
        }
        return true;
    })
    const keys = Object.keys(dataPlayerOfTheMatch);
    keys.map((key)=>{
        const obj = dataPlayerOfTheMatch[key];
        //console.log(obj);
        const topPlayerObjec = {};
        const keys = Object.keys(obj);
        let maxKey = 'key';
        let maxValue = 0;
        keys.map((key)=>{
            if(obj[key] > maxValue){
                maxKey = key;
                maxValue = obj[key];
            }
            return true;
        })
        topPlayerObjec[maxKey] = maxValue;
        dataPlayerOfTheMatch[key] = topPlayerObjec;
        return true;
    })
    return dataPlayerOfTheMatch;
}

function getstrikeRateBySeasons(matchData, deliveryData){
    const strikeRateObject = {};
    matchData.map((element)=>{
        const season = element.season;
        const matchId = element.id;
        if(!(season in strikeRateObject)){
            strikeRateObject[saeson] ={} 
        }
        deliveryData.map((delivery)=>{
            
        })
        return true;
    })
    
}

module.exports = {getMatchesPlayedPerYear, getmatcheswonPerTeamPerYear,getExtraRunsPerTeamByYear,gettop10BowlersByYear,getCountTeamWonMatchAndToss,getplayerOfTheMatchPerSeason,getstrikeRateBySeasons}
