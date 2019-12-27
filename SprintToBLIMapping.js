/**
 * The SprintToBLIMapping class reads from the database, and maintains,
 * two static Maps: 1) the sprintToBLIMap that stores, for each SprintID,
 * its collection of BacklogItemIDs (representing all the items that are
 * in a Sprint to); and 2) the bliToSprintMap that stores, for each BacklogItemID, 
 * its collection of Sprints (representing all of the Sprints in which that 
 * BacklogItem has been active).  SprintToBLIMapping builds these maps after 
 * loading all of its own records from the database.  Thereafter, a BacklogItem 
 * can request all of its Sprints via the getSprintsFor() static method, 
 * passing its own ID as the argument.  Likewise, a Sprint could request all 
 * of its BacklogItems by passing its own ID as an argument into the static method
 * getBLIsFor().
 * 
 * Once read from the database, these maps will be maintained as BacklogItems are 
 * activated in Sprints.
 */
class SprintToBLIMapping extends DatabaseTable {

    /**
     * @type {String} the unique ID for the SprintToBLIMapping record
     */
    sprintToBLIMappingID = undefined;
    
    /**
     * @type {String} an ID for the Sprint to be mapped to one or more 
     * BacklogItems
     */

    sprintID = undefined;

    /**
     * @type {String} an ID for the BacklogItem to be mapped to one
     * or more Sprints
     */
    backlogItemID = undefined;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'SprintToBLIMappingID',
        'SprintID', 
        'BacklogItemID', 
    ];

    /**
     * @type {Map of Arrays of Strings} a Map keyed by SprintID, whose values
     * are Arrays of BacklogItemIDs
     */
    static sprintToBLIMap = new Map();

    /**
     * @type {Map of Arrays of Strings} a Map keyed by BacklogItemIDs, whose values
     * are Arrays of SprintIDs
     */
    static bliToSprintMap = new Map();

    /**
     * @override Load the records from the database, and also build the two maps:
     * sprintToBLIMap and bliToSprintMap.
     */
    static loadFromDatabase() {
        super.loadFromDatabase();
        this.buildMaps();
    }

    /**
     * @private
     * Go through the instances of the receiver, as loaded from the database, and
     * use the data to create the two maps: the sprintToBLIMap, and the
     * bliToSprintMap.  
     */
    static buildMaps() {
        for (var [eachMappingID, eachMapping] of this.instances) {
            var eachSprintID = eachMapping.sprintID;
            var eachBacklogItemID = eachMapping.backlogItemID;
            
            var backlogItems = this.sprintToBLIMap.get(eachSprintID);
            if (backlogItems == undefined) {
                backlogItems = [];
            }
            backlogItems.push(eachBacklogItemID);
            this.sprintToBLIMap.set(eachSprintID, backlogItems);

            var sprintItems = this.bliToSprintMap.get(eachBacklogItemID);
            if (sprintItems == undefined) {
                sprintItems = [];
            }
            sprintItems.push(eachSprintID);
            this.bliToSprintMap.set(eachBacklogItemID, sprintItems);
        }
        console.log("sprintToBLIMap...");
        console.log(this.sprintToBLIMap);
        console.log("bliToSprintMap...");
        console.log(this.bliToSprintMap);
    }

    /**
     * For each of the BacklogItemIDs stored in the sprintToBLIMap for the
     * given Sprint ID, find and return the BacklogItems with those BacklogItemIDs.
     * @param {String} sprintID the unique ID for the Sprint looking for its
     * BacklogItems
     * @returns {Array of BacklogItems} all of the BacklogItems in this Sprint
     */
    static getBLIsFor(sprintID) {
        if(!this.isLoaded) {
            this.loadFromDatabase();
        }
        var bliIDs = this.sprintToBLIMap.get(sprintID);
        var answer = [];
        for (var bliID of bliIDs) {
            answer.push(BacklogItem.whereKeyIs(bliID));
        }
        return answer;
    }

    /**
     * For each of the SprintIDs stored in the bliToSprintMap for the
     * given BacklogItem ID, find and return the Sprints with those SprintIDs.
     * @param {String} backlogItemID the unique ID for the BacklogItem looking for its
     * Sprints
     * @returns {Array of Sprints} all of the Sprints into which this BacklogItem
     * has been added
     */
    static getSprintsFor(backlogItemID) {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        var sprintIDs = this.bliToSprintMap.get(backlogItemID);
        var answer = [];
        for (var sprintID of sprintIDs) {
            answer.push(Sprint.whereKeyIs(sprintID));
        }
        return answer;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the sprintToBLIMappingID instance variable from 
     * the receiver's SprintToBLIMappingID column in the database.
     * @param {String} aString The unique identifier for this SprintToBLIMapping
     */
    setSprintToBLIMappingID(aString) {
        this.sprintToBLIMappingID = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the sprintID instance variable from 
     * the receiver's SprintID column in the database.
     * @param {String} aString The identifier for the Sprint being mapped
     * to a BacklogItem
     */
    setSprintID(aString) {
        this.sprintID = aString;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the backlogItemID instance variable from 
     * the receiver's BacklogItemID column in the database.
     * @param {String} aString The identifier for the BacklogItem being
     * mapped to a Sprint
     */
    setBacklogItemID(aNumber) {
        this.backlogItemID = aNumber;
    }

}