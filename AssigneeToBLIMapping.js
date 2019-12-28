/**
 * The AssigneeToBLIMapping class reads from the database, and maintains,
 * two static Maps: 1) the assigneeToBLIMap that stores, for each AssgineeID,
 * its collection of BacklogItemIDs (representing all the items that an Assignee
 * is assigned to); and 2) the bliToAssigneeMap that stores, for each
 * BacklogItemID, its collection of AssigneeeIDs (representing all of the people
 * assinged to that BacklogItem).  AssigneeToBLIMapping builds these maps after 
 * loading all of its own records from the database.  Thereafter, a BacklogItem 
 * can request all of its assignees via the getAssigneesFor() static method, 
 * passing its own ID as the argument.  Likewise, an Assignee could request all 
 * of its BacklogItems by passing its own ID as an argument into the static method
 * getBLIsFor().
 * 
 * Once read from the database, these maps will be maintained as people are 
 * assinged to and deassigned from BacklogItems.
 */
class AssigneeToBLIMapping extends DatabaseTable {
    
    /**
     * @type {String} the unique ID for the AssigneeToBLIMapping record
     */
    assigneeToBLIMappingID = '';

    /**
     * @type {String} an ID for the Assignee to be mapped to one or
     * more BacklogItems
     */
    assigneeID = '';
    
    /**
     * @type {String} an ID for the BacklogItem to be mapped to one
     * or more Assignees
     */
    backlogItemID = '';

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'AssigneeToBLIMappingID',
        'AssigneeID', 
        'BacklogItemID', 
    ];

    /**
     * @type {Map of Arrays of Strings} a Map keyed by AssigneeID, whose values
     * are Arrays of BacklogItemIDs
     */
    static assigneeToBLIMap = new Map();

    /**
     * @type {Map of Arrays of Strings} a Map keyed by BacklogItemIDs, whose values
     * are Arrays of AssigneeIDs
     */
    static bliToAssigneeMap = new Map();

    /**
     * @override Load the records from the database, and also build the two maps:
     * assingeeToBLIMap and bliToAssigneeMap.
     */
    static loadFromDatabase() {
        super.loadFromDatabase();
        this.buildMaps();
    }

    /**
     * @private
     * Go through the instances of the receiver, as loaded from the database, and
     * use the data to create the two maps: the assgineeToBLIMap, and the
     * bliToAssigneeMap.  
     */
    static buildMaps() {
        for (var [eachMappingID, eachMapping] of this.instances) {
            var eachAssigneeID = eachMapping.assigneeID;            
            var eachBacklogItemID = eachMapping.backlogItemID;

            var backlogItems = [];  // assume the need for an empty array
            if (this.assigneeToBLIMap.has(eachAssigneeID)) {
                // but if the array already exists at this key, use the existing
                backlogItems = this.assigneeToBLIMap.get(eachAssigneeID);
            } 
            
            backlogItems.push(eachBacklogItemID); // add the BLI ID to the array
            this.assigneeToBLIMap.set(eachAssigneeID, backlogItems); 

            var assigneeItems = [];  // assume the need for an empty array
            if (this.bliToAssigneeMap.has(eachBacklogItemID)) {
                 // but if the array already exists at this key, use the existing
                assigneeItems = this.bliToAssigneeMap.get(eachBacklogItemID);
            }
            assigneeItems.push(eachAssigneeID);  // add the Assignee ID to the array
            this.bliToAssigneeMap.set(eachBacklogItemID, assigneeItems);
        }
        console.log("assigneeToBLIMap...");
        console.log(this.assigneeToBLIMap);
        console.log("bliToAssigneeMap...");
        console.log(this.bliToAssigneeMap);
    }
    /**
     * For each of the BacklogItemIDs stored in the assigneeToBLIMap for the
     * given Assignee ID, find and return the BacklogItems with those BacklogItemIDs.
     * @param {String} assigneeID the unique ID for the Assignee looking for its
     * BacklogItems
     * @returns {Array of BacklogItems} all of the BacklogItems to which the 
     * Assignee is assigned.
     */
    static getBLIsFor(assigneeID) {
        if(!this.isLoaded) {
            this.loadFromDatabase();
        }
        var bliIDs = this.assigneeToBLIMap.get(assigneeID);
        var answer = [];
        for (var bliID of bliIDs) {
            answer.push(BacklogItem.whereKeyIs(bliID));
        }
        return answer;
    }

    /**
     * For each of the AssigneeIDs stored in the bliToAssigneeMap for the
     * given BacklogItem ID, find and return the Assignees with those AssigneeIDs.
     * @param {String} backlogItemID the unique ID for the BacklogItem looking for its
     * Assignees
     * @returns {Array of Assignees} all of the Assignees which are assigned to
     * this BacklogItem.
     */
    static getAssigneesFor(backlogItemID) {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        var assigneeIDs = this.bliToAssigneeMap.get(backlogItemID);
        var answer = [];
        for (var assigneeID of assigneeIDs) {
            answer.push(Assignee.whereKeyIs(assigneeID));
        }
        return answer;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the assigneeeToBLIMappingID instance variable from 
     * the receiver's AssigneeeToBLIMappingID column in the database.
     * @param {String} aString The unique identifier for this AssigneeeToBLIMapping
     */
    setAssigneeToBLIMappingID(aString) {
        this.assigneeToBLIMappingID = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the assigneeeID instance variable from 
     * the receiver's AssigneeeID column in the database.
     * @param {String} aString The identifier for the Assigneee being mapped
     * to a BacklogItem
     */
    setAssigneeID(aString) {
        this.assigneeID = aString;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the backlogItemID instance variable from 
     * the receiver's BacklogItemID column in the database.
     * @param {String} aString The identifier for the BacklogItem being mapped
     * to an Assignee
     */
    setBacklogItemID(aString) {
        this.backlogItemID = aString;
    }

}