const Record = require("../Record.js").Record;

function allBacklogItemRecords() {
    var records = [];
    records.push(new Record([
        ['ID', 'BLI-1'],
        ['Priority', 1],
        ['Title', 'Do Task 1'],
        ['Description', 'This is a test for Task 1'],
        ['Points', 5],
        ['DueDate', '11/30/19'],
        ['ParentID', 'BLI-2'],
        ['IsTemplate', false]
    ]));
    records.push(new Record([
        ['ID', 'BLI-2'],
        ['Priority', 1],
        ['Title', 'Do Story'],
        ['Description', 'This is a test for a Story'],
        ['Points', 5],
        ['DueDate', '11/30/19'],
        ['ParentID', undefined],
        ['IsTemplate', false]
    ]));
    return records;
}

module.exports = {allBacklogItemRecords}