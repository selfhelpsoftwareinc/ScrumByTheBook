const Record = require("../Record.js").Record;

function allGroupCriterionRecords() {
    var records = [];
    records.push(new Record([
        ['Name', 'Assignee'],
        ['IsLevel', false],
        ['IsChange', false],
        ['LimitValuesToSprint', false],
        ['Level', ''],
        ['StateName', '']]));
    records.push(new Record([
        ['Name', 'Due Date'],
        ['IsLevel', false],
        ['IsChange', false],
        ['LimitValuesToSprint', true]]));
    records.push(new Record([
        ['Name', 'Level'],
        ['IsLevel', true],
        ['IsChange', false],
        ['LimitValuesToSprint', true],
        ['Level', 'settable']]));
    records.push(new Record([
        ['Name', 'Change'],
        ['IsLevel', false],
        ['IsChange', true],
        ['LimitValuesToSprint', true],
        ['Level', 'settable']]));
    records.push(new Record([
        ['Name', 'State'],
        ['IsLevel', false],
        ['IsChange', false]]));
    return records;
}

module.exports = {allGroupCriterionRecords}