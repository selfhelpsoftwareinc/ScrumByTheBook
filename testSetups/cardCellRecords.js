const Record = require("../Record.js").Record;

function allCardCellRecords() {
    var records = [];
    records.push(new Record([
        ['Numbers', '00-00'],
        ['Name', 'Path']]));
    records.push(new Record([
        ['Numbers', '01-00'],
        ['Name', 'Title']]));
    records.push(new Record([
        ['Numbers', '01-01'],
        ['Name', 'Priority']]));
    records.push(new Record([
        ['Numbers', '01-02'],
        ['Name', 'Points']]));
    records.push(new Record([
        ['Numbers', '02-00'],
        ['Name', 'Description']]));
    return records;
}

module.exports = {allCardCellRecords}