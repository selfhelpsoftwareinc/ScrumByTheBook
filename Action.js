/**
 * An Action is a defined operation that can be performed on
 * a BacklogItem to change its State.  E.g., a BacklogItem can 
 * be Marked Ready to change its state from "Added" to "Ready".
 * 
 * Actions are stored in the Database to provide maximum flexibility
 * for defining what operations can be performed on a BacklogItem.
 */
class Action extends DatabaseTable {
    /**
     * @type {String} The name of the Action, in the imperative. 
     * E.g., "Make Ready"
     */
    name = '';

    /**
     * @type {Boolean} Whether or not additional checks are required 
     * before a particular action can be offered to the user.  For 
     * example, the Make Ready action might not be available until
     * a BacklogItem in the Added state has AcceptanceCriteria added to it.
     * Checking for the existance of AcceptanceCriteria would be the extra
     * check needed.
     */
    extraChecksNeeded = false;
    
    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the columnNames stored in the databse for this class.
     */
   static columns = [
        'Name', 
        'ExtraChecksNeeded'
    ]; 

    static ValidActions = {
        ADD: 'Add',
        MARK_READY: 'Mark Ready',
        SCHEDULE: 'Schedule',
        COMPLETE: 'Complete',
        PASS: 'Pass',
        FAIL: 'Fail',
        ACCEPT: 'Accept',
        REJECT: 'Reject',
        KILL: 'Kill',
        HOLD: 'Hold',
        BLOCK: 'Block',
        MARK_UNREADY: 'Mark Unready',
        UNSCHEDULE: 'Unschedule',
        UNHOLD: 'Unhold',
        UNBLOCK: 'Unblock',
        REVIVE: 'Revive',
        DEACTIVATE: 'Deactivate'
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the name instance variable from the receiver's
     * Name column in the database.
     * @param {String} aString The unique identifier for this Action.
     */
    setName(aString) {
        this.name = aString;
    }

     /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the extraChecksNeeded instance variable from the receiver's
     * ExtraChecksNeeded column in the database.
     * @param {Boolean} aBoolean Whether or not extra checks are needed before
     * making this action available.
     */
    setExtraChecksNeeded(aBoolean) {
        this.extraChecksNeeded = aBoolean;
    }
}