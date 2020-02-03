const Record = require("../Record.js").Record;

function allTransitionRecords() {
    var records = [];

    // All Transitions starting from the Added state...
    records.push(new Record([
        ['StartPath', 'Added-Mark Ready'],
        ['EndState', 'Ready']]));
    records.push(new Record([
        ['StartPath', 'Added-Block'],
        ['EndState', 'Blocked']]));
    records.push(new Record([
        ['StartPath', 'Added-Kill'],
        ['EndState', 'Dead']]));
    records.push(new Record([
        ['StartPath', 'Added-Hold'],
        ['EndState', 'On Hold']]));

     // All Transitions starting from the Ready state...
     records.push(new Record([
        ['StartPath', 'Ready-Mark Unready'],
        ['EndState', 'Added']]));
    records.push(new Record([
        ['StartPath', 'Ready-Schedule'],
        ['EndState', 'To Do']]));
    records.push(new Record([
        ['StartPath', 'Ready-Block'],
        ['EndState', 'Blocked']]));
    records.push(new Record([
        ['StartPath', 'Ready-Kill'],
        ['EndState', 'Dead']]));
    records.push(new Record([
        ['StartPath', 'Ready-Hold'],
        ['EndState', 'On Hold']]));

      // All Transitions starting from the To Do state...
      records.push(new Record([
        ['StartPath', 'To Do-Unschedule'],
        ['EndState', 'Ready']]));
    records.push(new Record([
        ['StartPath', 'To Do-Activate'],
        ['EndState', 'Doing']]));
    records.push(new Record([
        ['StartPath', 'To Do-Block'],
        ['EndState', 'Blocked']]));
    records.push(new Record([
        ['StartPath', 'To Do-Kill'],
        ['EndState', 'Dead']]));
    records.push(new Record([
        ['StartPath', 'To Do-Hold'],
        ['EndState', 'On Hold']]));
    records.push(new Record([
        ['StartPath', 'To Do-Mark Unready'],
        ['EndState', 'Added']]));

     // All Transitions starting from the Doing state...
     records.push(new Record([
        ['StartPath', 'Doing-Deactivate'],
        ['EndState', 'To Do']]));
    records.push(new Record([
        ['StartPath', 'Doing-Complete'],
        ['EndState', 'Done']]));
    records.push(new Record([
        ['StartPath', 'Doing-Block'],
        ['EndState', 'Blocked']]));
    records.push(new Record([
        ['StartPath', 'Doing-Kill'],
        ['EndState', 'Dead']]));
    records.push(new Record([
        ['StartPath', 'Doing-Hold'],
        ['EndState', 'On Hold']]));
    records.push(new Record([
        ['StartPath', 'Doing-Mark Unready'],
        ['EndState', 'Added']]));
    records.push(new Record([
        ['StartPath', 'Doing-Unschedule'],
        ['EndState', 'Ready']]));
        
      // All Transitions starting from the Done state...
      records.push(new Record([
        ['StartPath', 'Done-Pass'],
        ['EndState', 'Tested']]));
    records.push(new Record([
        ['StartPath', 'Done-Fail'],
        ['EndState', 'To Do']]));

      // All Transitions starting from the Tested state...
      records.push(new Record([
        ['StartPath', 'Tested-Accept'],
        ['EndState', 'Accepted']]));
    records.push(new Record([
        ['StartPath', 'Tested-Reject'],
        ['EndState', 'To Do']]));
    
      // All Transitions starting from the Blocked state...
      records.push(new Record([
        ['StartPath', 'Blocked-Unblock'],
        ['EndState', 'Previous']]));
    records.push(new Record([
        ['StartPath', 'Blocked-Kill'],
        ['EndState', 'Dead']]));
    records.push(new Record([
        ['StartPath', 'Blocked-Hold'],
        ['EndState', 'On Hold']]));

     // All Transitions starting from the Hold state...
     records.push(new Record([
        ['StartPath', 'Hold-Unhold'],
        ['EndState', 'Previous']]));
    records.push(new Record([
        ['StartPath', 'Hold-Kill'],
        ['EndState', 'Dead']]));
    records.push(new Record([
        ['StartPath', 'Hold-Block'],
        ['EndState', 'Blocked']]));

     // All Transitions starting from the Done state...
     records.push(new Record([
        ['StartPath', 'Done-Revive'],
        ['EndState', 'Previous']]));

    return records;
}

module.exports = {allTransitionRecords}