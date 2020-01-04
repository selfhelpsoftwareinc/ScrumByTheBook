const Record = require("../Record.js").Record;

function allBLIChangeRecords() {
    var records = [];
    records.push(new Record([
        ['ID', 'BLIC-01'],
        ['Date', '2019/12/07'],
        ['StateName', 'Added'],
        ['BacklogItemID', 'BLI-1']]));
    records.push(new Record([
        ['ID', 'BLIC-02'],
        ['Date', '2019/12/08'],
        ['StateName', 'Ready'],
        ['BacklogItemID', 'BLI-1']]));
    records.push(new Record([
        ['ID', 'BLIC-03'],
        ['Date', '2019/12/09'],
        ['StateName', 'To Do'],
        ['BacklogItemID', 'BLI-1']]));
    records.push(new Record([
        ['ID', 'BLIC-04'],
        ['Date', '2019/12/10'],
        ['StateName', 'Doing'],
        ['BacklogItemID', 'BLI-1']]));
    return records;
}

module.exports = {allBLIChangeRecords}