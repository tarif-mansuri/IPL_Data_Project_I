
function getDataByYear(data, year){
    return data.filter((e)=>{
        if(e.season==year)
            return true;
        else
            return false;
    })
}
module.exports = {getDataByYear}