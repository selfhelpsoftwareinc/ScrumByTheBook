/**
 * The Record class interfaces with the SQL (or other) database.
 * An individual record organizes all of the values for a given
 * record in a given table into a Map, keyed by column name.
 * 
 * For initial testing purposes, rather than going to an actual
 * database, Record creates an Array of dummy records.  When asked
 * for all of the records for a given table, Record will initially
 * return all of these dummy records.
 * 
 * @todo Retrieve records from an actual database
 */
 class Record {
    /**
     * @type {Map} all of the values for a single record of a table,
     * keyed by column name.
     */
    values = new Map();

    /**
     * Create an instance of Record with its values set to a Map
     * constructed from anArrayOfArrays.
     * @param {Array of Arrays} anArrayOfArrays Each inner Array contains
     * key-value pairs, where the key is a string corresponding to a 
     * column name.
     */
    constructor(anArrayOfArrays) {
        this.values = new Map(anArrayOfArrays);
    }

    /**
     * Create and return an Array of all of the records retrieved that
     * are stored in the database in the table named tableName
     * @param {String} tableName The name of the table from which to
     * retrieve all records
     * @returns {Array of Records} The Array contains Records for each
     * of the database records stored in tableName.
     * @todo Retrieve records using SQL, rather than constructing a
     * static method name based on the tableName and getting dummy 
     * records.
     */ 
    static recordsFor(tableName) {
        var recordsFunction = this.allRecordsFunctionFor(tableName);
        if (recordsFunction == undefined) {
            return [];
        } else {
            return recordsFunction.call(this);
        }
    }

    /**
     * Retrieve and return the static function of Record that, for now,
     * returns an Array of dummy records to test the DatabseTable subclasses.
     * @param {String} tableName The (capitalized) name of the table/class
     * (subclass of DatabaseTable) for which to return records.
     * @returns {Function} a static function of Record
     * @todo Remove this method when Record.recordsFor() goes to a real
     * databse.
     */
    static allRecordsFunctionFor(tableName) {
        var recordsFunctionName = "all" + tableName + "Records";
        var recordsFunction = this[recordsFunctionName];
        if (recordsFunction == undefined) {
            console.log("Undefined Function: " + recordsFunctionName);
        }
        return recordsFunction;
    }

    /**
     * Retrieve and return an array of select records from the database
     * table tableName where the value in the database for columnName matches
     * value. 
     * @param {String} tableName The name of the table from which to retrieve
     * records
     * @param {String} columnName The name of the column in which to search
     * for the value 
     * @param {Object} value The value to match to the values in columnName
     * to satisfy the query.
     * @returns {Array of Records} containing records matching the search 
     * criteria.
     * @todo This will be done with a SQL Where statement ultimately.
     */
    static recordsWhere(tableName, columnName, value) {
        var answer = [];
        var all = this.recordsFor(tableName);
        for (var record of all) {
            if (record.at(columnName) == value) {
                answer.push(record);
            }
        }
        return answer;
    }

    /**
     * Dummy method: create and return an array of dummy BacklogItem records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for BacklogItem, and the value is a dummy value
     * for that columnName.
     */
    static allBacklogItemRecords() {
        var records = [];
        records.push(new Record([
            ['ID', 'BLI-1'],
            ['Priority', 1],
            ['Title', 'Do Task 1'],
            ['Description', 'This is a test for Task 1'],
            ['Points', 5],
            ['DueDate', '11/30/19'],
            ['ParentID', 'BLI-2'],
            ['IsTemplate', false]
        ]));
        records.push(new Record([
            ['ID', 'BLI-2'],
            ['Priority', 1],
            ['Title', 'Do Story'],
            ['Description', 'This is a test for a Story'],
            ['Points', 5],
            ['DueDate', '11/30/19'],
            ['ParentID', undefined],
            ['IsTemplate', false]
        ]));
        return records;
    }

    /**
     * Dummy method: create and return an array of dummy SprintToBLIMapping records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for SprintToBLIMapping, and the value is a dummy value
     * for that columnName.
     */
    static allSprintToBLIMappingRecords() {
        var records = [];
        records.push(new Record([
            ['SprintToBLIMappingID', 'STBM-1'],
            ['SprintID', 'SPNT-1'],
            ['BacklogItemID', 'BLI-1']
        ]));
        records.push(new Record([
            ['SprintToBLIMappingID', 'STBM-2'],
            ['SprintID', 'SPNT-1'],
            ['BacklogItemID', 'BLI-2']
        ]));
        records.push(new Record([
            ['SprintToBLIMappingID', 'STBM-3'],
            ['SprintID', 'SPNT-2'],
            ['BacklogItemID', 'BLI-2']
        ]));
        return records;
    }

    
    /**
     * Dummy method: create and return an array of dummy AssigneeToBLIMapping records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for AssigneeToBLIMapping, and the value is a dummy value
     * for that columnName.
     * Note that this particular example tests a scenario of pair programming, where
     * there are two assignees per BacklogItem.  It also tests the N-to-N relationship
     * between Assignees and BacklogItems because ASNEE-01 is assinged to two different
     * BacklogItems.
     */
    static allAssigneeToBLIMappingRecords() {
        var records = [];
        records.push(new Record([
            ['AssigneeToBLIMappingID', 'ATBM-1'],
            ['AssigneeID', 'ASNEE-00'],
            ['BacklogItemID', 'BLI-1']
        ]));
        records.push(new Record([
            ['AssigneeToBLIMappingID', 'ATBM-2'],
            ['AssigneeID', 'ASNEE-01'],
            ['BacklogItemID', 'BLI-1']
        ]));
        records.push(new Record([
            ['AssigneeToBLIMappingID', 'ATBM-3'],
            ['AssigneeID', 'ASNEE-01'],
            ['BacklogItemID', 'BLI-2']
        ]));
        records.push(new Record([
            ['AssigneeToBLIMappingID', 'ATBM-4'],
            ['AssigneeID', 'ASNEE-02'],
            ['BacklogItemID', 'BLI-2']
        ]));
        return records;
    }
    /**
     * Dummy method: create and return an array of dummy SystemConstant records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for SystemConstant, and the value is a dummy value
     * for that columnName.
     */
    static allSystemConstantRecords() {
        var records = [];
        records.push(new Record([
            ['SystemValueType', 'LastSprintID'], 
            ['SystemValue', 'SPNT-0']]));
        records.push(new Record([
            ['SystemValueType', 'LastBacklogItemID'], 
            ['SystemValue', 'BLI-0']]));
        records.push(new Record([
            ['SystemValueType', 'LastAcceptanceCriterionID'], 
            ['SystemValue', 'AC-0']]));
        records.push(new Record([
            ['SystemValueType', 'LastAssigneeID'], 
            ['SystemValue', 'ASGN-0']]));
        records.push(new Record([
            ['SystemValueType', 'LastChangeID'], 
            ['SystemValue', 'CHNG-0']]));
        records.push(new Record([
            ['SystemValueType', 'LastStateID'], 
            ['SystemValue', 'STATE-0']]));
        return records;

    }
 
     /**
     * Dummy method: create and return an array of dummy Preference records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for Preference, and the value is a dummy value
     * for that columnName.
     */
    static allPreferenceRecords() {
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

     /**
     * Dummy method: create and return an array of dummy Level records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for Level, and the value is a dummy value
     * for that columnName.
     */
    static allLevelRecords() {
        var records = [];
        records.push(new Record([
            ['Number', 0], 
            ['Name', 'Area'],
            ['Color', 'red']]));
        records.push(new Record([
            ['Number', 1], 
            ['Name', 'Theme'],
            ['Color', 'orange']]));
        records.push(new Record([
            ['Number', 2], 
            ['Name', 'Feature'],
            ['Color', 'yellow']]));
        records.push(new Record([
            ['Number', 3], 
            ['Name', 'Epic'],
            ['Color', 'green']]));
        records.push(new Record([
            ['Number', 4], 
            ['Name', 'Story'],
            ['Color', 'blue']]));
        records.push(new Record([
            ['Number', 5], 
            ['Name', 'Task'],
            ['Color', 'indigo']]));
        records.push(new Record([
            ['Number', 6], 
            ['Name', 'Subtask'],
            ['Color', 'violet']]));
        records.push(new Record([
            ['Number', 7], 
            ['Name', 'Subsubtask'],
            ['Color', 'purple']]));
       return records;
    }

       /**
     * Dummy method: create and return an array of dummy Assignment records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for Assignment, and the value is a dummy value
     * for that columnName.
     */
    static allAssigneeRecords() {   
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

    /**
     * Dummy method: create and return an array of dummy AcceptanceCriterion records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for AcceptanceCriterion, and the value is a dummy value
     * for that columnName.
     */
    static allAcceptanceCriterionRecords() {
        var records = [];
        records.push(new Record([
            ['ID', 'AC-01'],
            ['Description', 'Make Sure Task 1 Works'],
            ['BacklogItemID', 'BLI-1']]));
        records.push(new Record([
            ['ID', 'AC-02'],
            ['Description', 'Make Sure Task 1 Really Works'],
            ['BacklogItemID', 'BLI-1']]));
        return records;
    }

    /**
     * Dummy method: create and return an array of dummy State records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for State, and the value is a dummy value
     * for that columnName.
     */
    static allStateRecords() {
        var records = [];
        records.push(new Record([
            ['Name', State.ValidStates.DEAD],
            ['Color', 'red'],
            ['Include', true],
            ['IncludeInPipeline', false],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.BLOCKED],
            ['Color', 'orange'],
            ['Include', true],
            ['IncludeInPipeline', false],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.ONHOLD],
            ['Color', 'yellow'],
            ['Include', true],
            ['IncludeInPipeline', false],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.ADDED],
            ['Color', 'chartruese'],
            ['Include', true],
            ['IncludeInPipeline', true],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.READY],
            ['Color', 'green'],
            ['Include', true],
            ['IncludeInPipeline', true],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.TODO],
            ['Color', 'aqua'],
            ['Include', true],
            ['IncludeInPipeline', true],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.DOING],
            ['Color', 'cyan'],
            ['Include', true],
            ['IncludeInPipeline', true],
            ['IncludeInVelocity', false]]));
        records.push(new Record([
            ['Name', State.ValidStates.DONE],
            ['Color', 'blue'],
            ['Include', true],
            ['IncludeInPipeline', false],
            ['IncludeInVelocity', true]]));
        records.push(new Record([
            ['Name', State.ValidStates.TESTED],
            ['Color', 'indigo'],
            ['Include', true],
            ['IncludeInPipeline', false],
            ['IncludeInVelocity', true]]));
        records.push(new Record([
            ['Name', State.ValidStates.ACCEPTED],
            ['Color', 'violet'],
            ['Include', true],
            ['IncludeInPipeline', false],
            ['IncludeInVelocity', true]]));
        return records;
    }
    /**
     * Dummy method: create and return an array of dummy BLIChange records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for BLIChange, and the value is a dummy value
     * for that columnName.
     */
    static allBLIChangeRecords() {
        var records = [];
        records.push(new Record([
            ['ID', 'BLIC-01'],
            ['Date', '2019/12/07'],
            ['StateName', State.ValidStates.ADDED],
            ['BacklogItemID', 'BLI-1']]));
        records.push(new Record([
            ['ID', 'BLIC-02'],
            ['Date', '2019/12/08'],
            ['StateName', State.ValidStates.READY],
            ['BacklogItemID', 'BLI-1']]));
        records.push(new Record([
            ['ID', 'BLIC-03'],
            ['Date', '2019/12/09'],
            ['StateName', State.ValidStates.TODO],
            ['BacklogItemID', 'BLI-1']]));
        records.push(new Record([
            ['ID', 'BLIC-04'],
            ['Date', '2019/12/10'],
            ['StateName', State.ValidStates.DOING],
            ['BacklogItemID', 'BLI-1']]));
        return records;
    }
    /**
     * Dummy method: create and return an array of dummy Action records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for Action, and the value is a dummy value
     * for that columnName.
     */
    static allActionRecords() {
            var records = [];
            records.push(new Record([
                ['Name', Action.ValidActions.ADD],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.MARK_READY],
                ['ExtraChecksNeeded', true]]));
            records.push(new Record([
                ['Name', Action.ValidActions.SCHEDULE],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.COMPLETE],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.PASS],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.FAIL],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.ACCEPT],
                ['ExtraChecksNeeded', true]]));
            records.push(new Record([
                ['Name', Action.ValidActions.REJECT],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.KILL],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.HOLD],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.BLOCK],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.MARK_UNREADY],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.UNSCHEDULE],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.UNHOLD],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.UNBLOCK],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.REVIVE],
                ['ExtraChecksNeeded', false]]));
            records.push(new Record([
                ['Name', Action.ValidActions.DEACTIVATE],
                ['ExtraChecksNeeded', false]]));
            return records;
        }
 
     /**
     * Dummy method: create and return an array of dummy Transition records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for Transition, and the value is a dummy value
     * for that columnName.
     */
    static allTransitionRecords() {
        var records = [];

        // All Transitions starting from the Added state...
        records.push(new Record([
            ['StartPath', 
                State.ValidStates.ADDED 
                + '-' 
                + Action.ValidActions.MARK_READY 
            ],
            ['EndState', State.ValidStates.READY]]));
        records.push(new Record([
            ['StartPath', 
                State.ValidStates.ADDED  
                + '-' 
                + Action.ValidActions.BLOCK 
            ],
            ['EndState', State.ValidStates.BLOCKED]]));
        records.push(new Record([
            ['StartPath', 
                State.ValidStates.ADDED  
                + '-' 
                + Action.ValidActions.KILL 
            ],
            ['EndState', State.ValidStates.DEAD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.ADDED  
                + '-' 
                + Action.ValidActions.HOLD 
            ],
            ['EndState', State.ValidStates.ONHOLD]]));

         // All Transitions starting from the Ready state...
         records.push(new Record([
            ['StartPath',  
                State.ValidStates.READY  
                + '-' 
                + Action.ValidActions.MARK_UNREADY 
            ],
            ['EndState', State.ValidStates.ADDED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.READY + '-' 
                + Action.ValidActions.SCHEDULE 
            ],
            ['EndState', State.ValidStates.TODO]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.READY  
                + '-' 
                + Action.ValidActions.BLOCK 
            ],
            ['EndState', State.ValidStates.BLOCKED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.READY  
                + '-' 
                + Action.ValidActions.KILL 
            ],
            ['EndState', State.ValidStates.DEAD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.READY  
                + '-' 
                + Action.ValidActions.HOLD 
            ],
            ['EndState', State.ValidStates.ONHOLD]]));

          // All Transitions starting from the To Do state...
          records.push(new Record([
            ['StartPath',  
                State.ValidStates.TODO  
                + '-' 
                + Action.ValidActions.UNSCHEDULE 
            ],
            ['EndState', State.ValidStates.READY]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.TODO  
                + '-' 
                + Action.ValidActions.ACCEPTED 
            ],
            ['EndState', State.ValidStates.DOING]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.TODO  
                + '-' 
                + Action.ValidActions.BLOCK 
            ],
            ['EndState', State.ValidStates.BLOCKED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.TODO  
                + '-' 
                + Action.ValidActions.KILL 
            ],
            ['EndState', State.ValidStates.DEAD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.TODO  
                + '-' 
                + Action.ValidActions.HOLD 
            ],
            ['EndState', State.ValidStates.ONHOLD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.TODO  
                + '-' 
                + Action.ValidActions.MARK_UNREADY 
            ],
            ['EndState', State.ValidStates.ADDED]]));

         // All Transitions starting from the Doing state...
         records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.DEACTIVATE 
            ],
            ['EndState', State.ValidStates.TODO]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.COMPLETE 
            ],
            ['EndState', State.ValidStates.DONE]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.BLOCK 
            ],
            ['EndState', State.ValidStates.BLOCKED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.KILL 
            ],
            ['EndState', State.ValidStates.DEAD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.HOLD 
            ],
            ['EndState', State.ValidStates.ONHOLD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.MARK_UNREADY 
            ],
            ['EndState', State.ValidStates.ADDED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DOING  
                + '-' 
                + Action.ValidActions.UNSCHEDULE 
            ],
            ['EndState', State.ValidStates.READY]]));
            
          // All Transitions starting from the Done state...
          records.push(new Record([
            ['StartPath',  
                State.ValidStates.DONE  
                + '-' 
                + Action.ValidActions.PASS 
            ],
            ['EndState', State.ValidStates.TESTED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.DONE  
                + '-' 
                + Action.ValidActions.FAIL 
            ],
            ['EndState', State.ValidStates.TODO]]));

          // All Transitions starting from the Tested state...
          records.push(new Record([
            ['StartPath',  
                State.ValidStates.TESTED  
                + '-' 
                + Action.ValidActions.ACCEPT 
            ],
            ['EndState', State.ValidStates.ACCEPTED]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.TESTED  
                + '-' 
                + Action.ValidActions.REJECT 
            ],
            ['EndState', State.ValidStates.TODO]]));
        
          // All Transitions starting from the Blocked state...
          records.push(new Record([
            ['StartPath',  
                State.ValidStates.BLOCKED  
                + '-' 
                + Action.ValidActions.UNBLOCK 
            ],
            ['EndState', State.ValidStates.PREVIOUS]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.BLOCKED  
                + '-' 
                + Action.ValidActions.KILL 
            ],
            ['EndState', State.ValidStates.DEAD]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.BLOCKED  
                + '-' 
                + Action.ValidActions.HOLD 
            ],
            ['EndState', State.ValidStates.ONHOLD]]));

         // All Transitions starting from the Hold state...
         records.push(new Record([
            ['StartPath',  
                State.ValidStates.HOLD  
                + '-' 
                + Action.ValidActions.UNHOLD 
            ],
            ['EndState', State.ValidStates.PREVIOUS]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.HOLD  
                + '-' 
                + Action.ValidActions.KILL 
            ],
            ['EndState', State.ValidStates.DEAD 
        ]]));
        records.push(new Record([
            ['StartPath',  
                State.ValidStates.HOLD  
                + '-' 
                + Action.ValidActions.BLOCK 
            ],
            ['EndState', State.ValidStates.BLOCKED]]));

         // All Transitions starting from the Done state...
         records.push(new Record([
            ['StartPath',  
                State.ValidStates.DONE  
                + '-' 
                + Action.ValidActions.REVIVE 
            ],
            ['EndState', State.ValidStates.PREVIOUS]]));

        return records;
    }

     /**
     * Dummy method: create and return an array of dummy GroupCriterion records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for GroupCriterion, and the value is a dummy value
     * for that columnName.
     */
    static allGroupCriterionRecords() {
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
    
     /**
     * Dummy method: create and return an array of dummy CardSort records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for CardSort, and the value is a dummy value
     * for that columnName.
     */
    static allCardSortRecords() {
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
            ['TransitionStartStateName', State.ValidStates.ADDED],
            ['TransitionActionName', Action.ValidActions.MARK_READY]]));
        records.push(new Record([
            ['Name', 'Points'],
            ['IsTransition', false]]));
        records.push(new Record([
            ['Name', 'Priority'],
            ['IsTransition', false]]));
        return records;
    }
    
     /**
     * Dummy method: create and return an array of dummy CardLayout records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for CardLayout, and the value is a dummy value
     * for that columnName.
     */
    static allCardCellRecords() {
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

    /**
     * Dummy method: create and return an array of dummy Sprint records
     * @returns {Array of Records} where each record's values is a Map where
     * the key is a columnName for Sprint, and the value is a dummy value
     * for that columnName.
     */
    static allSprintRecords() {
        var records = [];
        records.push(new Record([
            ['ID', 'SPNT-1'],
            ['StartDate', '2019/12/09'],
            ['Duration', 14]]));
        records.push(new Record([
            ['ID', 'SPNT-2'],
            ['StartDate', '2019/12/23'],
            ['Duration', 14]]));
        return records;
    }    
 
    /**
     * Find and answer the value in the values Map whose columnName is aColumnName.
     * @param {String} aColumnName The key in the values Map on which to search.
     * @returns {Object} The value in the record corresponding to aColumnName
     */
    at(aColumnName) {
        return this.values.get(aColumnName);
    }
    
    /**
     * Collect and answer the column names of this record; which are all
     * of the keys of the map of values.
     * @returns {Array of Strings} The names of all of the columns.
     */
    columnNames() {
        var columnNames = [];
        for (var key of this.values.keys()) {
            columnNames.push(key);
        }
        return columnNames;
    }

}
module.exports = {Record}