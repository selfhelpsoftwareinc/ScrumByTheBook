const Record = require("../Record.js").Record;

function allStateRecords() {
    var records = [];
    records.push(new Record([
        ['Name', 'Dead'],
        ['Color', 'red'],
        ['Include', true],
        ['IncludeInPipeline', false],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'Blocked'],
        ['Color', 'orange'],
        ['Include', true],
        ['IncludeInPipeline', false],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'On Hold'],
        ['Color', 'yellow'],
        ['Include', true],
        ['IncludeInPipeline', false],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'Added'],
        ['Color', 'chartruese'],
        ['Include', true],
        ['IncludeInPipeline', true],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'Ready'],
        ['Color', 'green'],
        ['Include', true],
        ['IncludeInPipeline', true],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'To Do'],
        ['Color', 'aqua'],
        ['Include', true],
        ['IncludeInPipeline', true],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'Doing'],
        ['Color', 'cyan'],
        ['Include', true],
        ['IncludeInPipeline', true],
        ['IncludeInVelocity', false]]));
    records.push(new Record([
        ['Name', 'Done'],
        ['Color', 'blue'],
        ['Include', true],
        ['IncludeInPipeline', false],
        ['IncludeInVelocity', true]]));
    records.push(new Record([
        ['Name', 'Tested'],
        ['Color', 'indigo'],
        ['Include', true],
        ['IncludeInPipeline', false],
        ['IncludeInVelocity', true]]));
    records.push(new Record([
        ['Name', 'Accepted'],
        ['Color', 'violet'],
        ['Include', true],
        ['IncludeInPipeline', false],
        ['IncludeInVelocity', true]]));
    return records;
}

module.exports = {allStateRecords}