const Record = require("../Record.js").Record;

function allActionRecords() {
    var records = [];
    records.push(new Record([
        ['Name', 'Add'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Mark Ready'],
        ['ExtraChecksNeeded', true]]));
    records.push(new Record([
        ['Name', 'Schedule'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Complete'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Pass'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Fail'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Accept'],
        ['ExtraChecksNeeded', true]]));
    records.push(new Record([
        ['Name', 'Reject'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Kill'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Hold'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Block'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Mark Unready'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Unschedule'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Unhold'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Unblock'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Reveive'],
        ['ExtraChecksNeeded', false]]));
    records.push(new Record([
        ['Name', 'Deactivate'],
        ['ExtraChecksNeeded', false]]));
    return records;
}

module.exports = {allActionRecords}