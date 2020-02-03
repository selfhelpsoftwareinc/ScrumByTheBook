const databaseClass = require("../../Database.js").Database;
const acceptanceCriterionClass = require("../../AcceptanceCriterion.js").AcceptanceCriterion;
const actionClass = require("../../Action.js").Action;
const assigneeClass = require("../../Assignee.js").Assignee;
const assigneeToBLIMappingClass = require("../../AssigneeToBLIMapping.js").AssigneeToBLIMapping;
const backlogItemClass = require("../../BacklogItem.js").BacklogItem;
const bliChangeClass = require("../../BLIChange.js").BLIChange;
const cardCellClass = require("../../CardCell.js").CardCell;
const cardSortClass = require("../../CardSort.js").CardSort;
const groupCriterionClass = require("../../GroupCriterion.js").GroupCriterion;
const levelClass = require("../../Level.js").Level;
const preferenceClass = require("../../Preference.js").Preference;
const sprintClass = require("../../Sprint.js").Sprint;
const sprintToBLIMappingClass = require("../../SprintToBLIMapping.js").SprintToBLIMapping;
const stateClass = require("../../State.js").State;
const systemConstantsClass = require("../../SystemConstant.js").SystemConstant;
const transitionClass = require("../../Transition.js").Transition;

const assert = require('chai').assert;
const logger = require('../../node_modules/mocha-logger');

const persistentClasses = [
    acceptanceCriterionClass,
    actionClass,
    assigneeClass,
    assigneeToBLIMappingClass,
    backlogItemClass,
    bliChangeClass,
    cardCellClass,
    cardSortClass,
    groupCriterionClass,
    levelClass,
    preferenceClass,
    sprintClass,
    sprintToBLIMappingClass,
    stateClass,
    systemConstantsClass,
    transitionClass
];

describe('Database', function () {
    persistentClasses.forEach(function(persistentClass) {
        before('load all instances', function() {
            logger.log('before - load all instances')
            logger.log(persistentClass.name);
            persistentClass.loadFromDatabase();
        })
        it('should have more than zero columns', function() {
            logger.log(persistentClass.name);
            assert.isNotEmpty(persistentClass.columns)
        });
        it ('should be loaded', function(){
            logger.log(persistentClass.name);
            assert.isTrue(persistentClass.isLoaded, 'not loaded: ' + persistentClass.name);
        });
        it('should have instances', function () {
            logger.log(persistentClass.name);
            assert.isNotNull(persistentClass.instances)                
        });
        it('should have more than zero instances', function() {
            logger.log(persistentClass.name);
            assert.isNotEmpty(persistentClass.instances)
        });
    });
})