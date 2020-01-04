const Record = require("../Record.js").Record;

function allSystemConstantRecords() {
    var records = [];
    records.push(new Record([
        ['SystemValueType', 'LastSprintID'], 
        ['SystemValue', 'SPNT-0']]));
    records.push(new Record([
        ['SystemValueType', 'LastBacklogItemID'], 
        ['SystemValue', 'BLI-0']]));
    records.push(new Record([
        ['SystemValueType', 'LastAcceptanceCriterionID'], 
        ['SystemValue', 'AC-0']]));
    records.push(new Record([
        ['SystemValueType', 'LastAssigneeID'], 
        ['SystemValue', 'ASGN-0']]));
    records.push(new Record([
        ['SystemValueType', 'LastChangeID'], 
        ['SystemValue', 'CHNG-0']]));
    records.push(new Record([
        ['SystemValueType', 'LastStateID'], 
        ['SystemValue', 'STATE-0']]));
    return records;
}

module.exports = {allSystemConstantRecords}