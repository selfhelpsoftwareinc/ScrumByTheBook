// var, let, const
// var is obsolete because it is globally scoped

// Datatypes: String, Number, Boolean, null, undefined, Symbol

 // Strings can have double or single quotes
//  var columnFunctionMappings = new Map(
//     [
//         ['BacklogItemID', backlogItemID],
//         ['Title', titleString]
//     ]
//  );

//  function backlogItemID(aNumber) {
//     console.log('BacklogItemID is ' + ' ' + aNumber);
//  }

//  function titleString(aString) {
//     console.log('Title String is ' + ' ' + aString);
//  }

//  function valueFor(keyString) {
//      if (keyString == 'BacklogItemID') {return 1}
//      else if(keyString == 'Title') {return 'War and Peace'}
//  }

// for (var [key, functionName] of columnFunctionMappings) {
//     functionName(valueFor(key));
// }

var theClasses = [
    SprintToBLIMapping, 
    AssigneeToBLIMapping, 
    SystemConstant, 
    Preference,
    Level,
    Assignee,
    AcceptanceCriterion,
    BacklogItem, 
    State,
    BLIChange,
    Action,
    Transition,
    GroupCriterion,
    CardSort,
    CardLayout,
    Sprint
];

for (var aClass of theClasses) {
    var instances = aClass.allInstances();
    console.log(aClass.name + "...");
    console.log(instances);
}

console.log("LastSprintID: " + SystemConstant.valueAt('LastSprintID'));
console.log("SprintDuration: " + Preference.preferenceAt('SprintDuration'));
console.log("CardLayout lines...");
console.log(CardLayout.lines);
 