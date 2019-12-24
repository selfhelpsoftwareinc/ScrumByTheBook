/**
 * Each BLIChange stores state change information for a single change of
 * state for a BacklogItem.  In particular, it stores the name of the new
 * state and the date at which the BacklogItem changed to this state.
 * 
 * A collection of BLIChanges together form the BLIChangeHistory.
 */
class BLIChange extends DatabaseTable {
    /**
     * @type {String} a unique identifier for this instance of the BLIChange.
     */
    id = undefined;

    /** 
     * @type {Date} the date at which the BacklogItem changed to the new
     * state
     */
    date = undefined;

    /**
     * @type {String} the name of the new state, as stored in the database.
     * It is loaded temporarily from the database until it can be converted 
     * to a real State.
     */
    stateName = undefined

    /**
     * @type {State} the new state of the BacklogItem upon this change.
     */
    state = undefined;

    /**
     * @type {String} the foreign key of the BacklogItem for which this
     * is a change.
     */
    backlogItemID = undefined;
    
    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'ID', 
        'Date', 
        'StateName', 
        'BacklogItemID'
    ]; 


    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the id instance variable from the receiver's
     * ID column in the database.
     * @param {String} aString The unique identifier for this AcceptanceCriterion
     */
    setID(aNumber) {
        this.id = aNumber;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the date instance variable from the receiver's
     * Date column in the database.
     * @param {Date} aDate The date at which the change occurred.
     */
    setDate(aDate) {
        this.date = aDate;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the stateName instance variable from the receiver's
     * StateName column in the database, and use that to set the receiver's
     * state instance variable.
     * @param {String} aString The name of the state.
     */
    setStateName(aString) {
        this.stateName = aString;
        this.state = State.whereKeyIs(aString);
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the backlogItemID instance variable from the receiver's
     * BacklogItemID column in the database.
     * @param {String} aString The unique identifier that serves as the foriegn
     * key into the BacklogItem table.
     */
    setBacklogItemID(aString) {
        this.backlogItemID = aString;
    }

    /**
     * For subclasses of DatabaseTable where instances are being retrieved from the 
     * database based on something other than the keyColumn, it is necessary to
     * provide a getter function in the form "get + <foreignKey>".
     * 
     * In this case, answer the value of the foreign key "BacklogItemID" so we 
     * can find all of the BLIChanges for a given BacklogItem.
     * 
     * @returns {String} The foreign key for the BacklogItem's ID.
     */
    getBacklogItemID() {
        return this.backlogItemID;
    }

}