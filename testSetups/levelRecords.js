const Record = require("../Record.js").Record;

function allLevelRecords() {
    var records = [];
    records.push(new Record([
        ['Number', 0], 
        ['Name', 'Area'],
        ['Color', 'red']]));
    records.push(new Record([
        ['Number', 1], 
        ['Name', 'Theme'],
        ['Color', 'orange']]));
    records.push(new Record([
        ['Number', 2], 
        ['Name', 'Feature'],
        ['Color', 'yellow']]));
    records.push(new Record([
        ['Number', 3], 
        ['Name', 'Epic'],
        ['Color', 'green']]));
    records.push(new Record([
        ['Number', 4], 
        ['Name', 'Story'],
        ['Color', 'blue']]));
    records.push(new Record([
        ['Number', 5], 
        ['Name', 'Task'],
        ['Color', 'indigo']]));
    records.push(new Record([
        ['Number', 6], 
        ['Name', 'Subtask'],
        ['Color', 'violet']]));
    records.push(new Record([
        ['Number', 7], 
        ['Name', 'Subsubtask'],
        ['Color', 'purple']]));
   return records;
}

module.exports = {allLevelRecords}