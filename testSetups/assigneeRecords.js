const Record = require("../Record.js").Record;

function allAssigneeRecords() {   
    var records = [];
    records.push(new Record([
        ['ID', 'ASNEE-00'],
        ['FirstName', 'Sigrid'],
        ['LastName', 'Mortensen'],
        ['ShortName', 'sigridM'],
        ['EmailAddress', 'sigrid@susaro.com'],
        ['Color', 'red']]));
    records.push(new Record([
        ['ID', 'ASNEE-01'],
        ['FirstName', 'Richard'],
        ['LastName', 'Loosemore'],
        ['ShortName', 'richardL'],
        ['EmailAddress', 'richard@susaro.com'],
        ['Color', 'orange']]));
    records.push(new Record([
        ['ID', 'ASNEE-02'],
        ['FirstName', 'Soren'],
        ['LastName', 'Mortensen'],
        ['ShortName', 'sorenM'],
        ['EmailAddress', 'soren@susaro.com'],
        ['Color', 'yellow']]));
    return records;
}

module.exports = {allAssigneeRecords}