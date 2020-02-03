const Record = require("../Record.js").Record;

function allPreferenceRecords() {
    var records = [];
    records.push(new Record([
        ['PreferenceType', 'SprintDuration'], 
        ['Preference', 14]]));
    records.push(new Record([
        ['PreferenceType', 'UseAverageVelocity'], 
        ['Preference', true]]));
    records.push(new Record([
        ['PreferenceType', 'EstimatedVelocity'], 
        ['Preference', 0]]));
    records.push(new Record([
        ['PreferenceType', 'UseFibonacciNumbers'], 
        ['Preference', true]]));
    records.push(new Record([
        ['PreferenceType', 'ReadyRequiresPoints'], 
        ['Preference', true]]));
    records.push(new Record([
        ['PreferenceType', 'ReadyRequiresAcceptanceCriteriaPresent'], 
        ['Preference', true]]));
    records.push(new Record([
        ['PreferenceType', 'AcceptedRequiresAllAcceptanceCriteriaAccepted'], 
        ['Preference', true]]));
    records.push(new Record([
        ['PreferenceType', 'FirstSprintStartDate'], 
        ['Preference', '2019/12/09']]));
    return records;
}

module.exports = {allPreferenceRecords}