const Record = require("../Record.js").Record;

function allSprintRecords() {
    var records = [];
    records.push(new Record([
        ['ID', 'SPNT-1'],
        ['StartDate', '2019/12/09'],
        ['Duration', 14]]));
    records.push(new Record([
        ['ID', 'SPNT-2'],
        ['StartDate', '2019/12/23'],
        ['Duration', 14]]));
    return records;
}

module.exports = {allSprintRecords}