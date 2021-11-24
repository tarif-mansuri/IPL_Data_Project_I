
function getDataByYear(data, year){
    return data.filter((e)=>{
        if(e.season==year)
            return true;
        else
            return false;
    })
}
function objectToArray(obj){
    const arr = [];
    const keys = Object.keys(obj);
    keys.map((key)=>{
        newObj = {};
        newObj[key] = obj[key];
        arr.push(newObj);
        return true;
    })
    return arr;
}
module.exports = {getDataByYear,objectToArray}