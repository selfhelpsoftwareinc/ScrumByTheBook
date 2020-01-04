const Record = require("../Record.js").Record;

function allAssigneeToBLIMappingRecords() {
    var records = [];
    records.push(new Record([
        ['AssigneeToBLIMappingID', 'ATBM-1'],
        ['AssigneeID', 'ASNEE-00'],
        ['BacklogItemID', 'BLI-1']
    ]));
    records.push(new Record([
        ['AssigneeToBLIMappingID', 'ATBM-2'],
        ['AssigneeID', 'ASNEE-01'],
        ['BacklogItemID', 'BLI-1']
    ]));
    records.push(new Record([
        ['AssigneeToBLIMappingID', 'ATBM-3'],
        ['AssigneeID', 'ASNEE-01'],
        ['BacklogItemID', 'BLI-2']
    ]));
    records.push(new Record([
        ['AssigneeToBLIMappingID', 'ATBM-4'],
        ['AssigneeID', 'ASNEE-02'],
        ['BacklogItemID', 'BLI-2']
    ]));
    return records;
}

module.exports = {allAssigneeToBLIMappingRecords}