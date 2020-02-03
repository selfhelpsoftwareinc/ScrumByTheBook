const Record = require("../Record.js").Record;

function allAcceptanceCriterionRecords() {
    var records = [];
    records.push(new Record([
        ['ID', 'AC-01'],
        ['Description', 'Make Sure Task 1 Works'],
        ['BacklogItemID', 'BLI-1']]));
    records.push(new Record([
        ['ID', 'AC-02'],
        ['Description', 'Make Sure Task 1 Really Works'],
        ['BacklogItemID', 'BLI-1']]));
    return records;
}

module.exports = {allAcceptanceCriterionRecords}