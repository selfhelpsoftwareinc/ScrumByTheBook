const Record = require("../Record.js").Record;

function allSprintToBLIMappingRecords() {
    var records = [];
    records.push(new Record([
        ['SprintToBLIMappingID', 'STBM-1'],
        ['SprintID', 'SPNT-1'],
        ['BacklogItemID', 'BLI-1']
    ]));
    records.push(new Record([
        ['SprintToBLIMappingID', 'STBM-2'],
        ['SprintID', 'SPNT-1'],
        ['BacklogItemID', 'BLI-2']
    ]));
    records.push(new Record([
        ['SprintToBLIMappingID', 'STBM-3'],
        ['SprintID', 'SPNT-2'],
        ['BacklogItemID', 'BLI-2']
    ]));
    return records;
}

module.exports = {allSprintToBLIMappingRecords}