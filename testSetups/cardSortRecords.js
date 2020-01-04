const Record = require("../Record.js").Record;

function allCardSortRecords() {
    var records = [];
    records.push(new Record([
        ['Name', 'Path'],
        ['IsTransition', false]]));
    records.push(new Record([
        ['Name', 'Due Date'],
        ['IsTransition', false]]));
    records.push(new Record([
        ['Name', 'Transition'],
        ['IsTransition', true],
        ['TransitionStartStateName', 'Added'],
        ['TransitionActionName', 'Mark Ready']]));
    records.push(new Record([
        ['Name', 'Points'],
        ['IsTransition', false]]));
    records.push(new Record([
        ['Name', 'Priority'],
        ['IsTransition', false]]));
    return records;
}

module.exports = {allCardSortRecords}