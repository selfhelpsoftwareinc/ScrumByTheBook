/**
 * Every BacklogItem can have 0 or more AcceptanceCriteria.
 * Each AcceptanceCriterion describes what must be done for 
 * the corresponding BacklogItem to be accepted by the 
 * Product Owner, and contains a Boolean for whether or not
 * the Product Owner has decided that the AcceptanceCriterion
 * has been satisfied.
 */
class AcceptanceCriterion extends DatabaseTable {

    /**
     * @type {String} the unique identifier for the AcceptanceCriterion
     * in the database
     */
    id = undefined;

    /**
     * @type {String} text describing the conditions for satisfying the
     * AcceptanceCriterion
     */
    description = '';

    /**
     * @type {Boolean} whether or not the AcceptanceCriterion is accepted
     * by the Product Owner.
     */
    isAccepted = false;

    /**
     * @type {String} the unique identifier for the BacklogItem that
     * this AcceptanceCriterion tests.
     */
    backlogItemID = undefined;
  
    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'ID', 
        'Description', 
        'IsAccepted', 
        'BacklogItemID'
    ]; 

    /**
     * Find and return all of the AcceptanceCriteria that have been created
     * for BacklogItem.
     * @param {BacklogItem} aBacklogItem 
     * @returns {Map} a Map of AcceptanceCrtierion instances, keyed by
     * AcceptanceCriterion ID's (the value of AcceptanceCriterion's keyColumn)
     */
    static allFor(aBacklogItem) {
        return this.allWhere('BacklogItemID', aBacklogItem.id);
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the id instance variable from the receiver's
     * ID column in the database.
     * @param {String} aString The unique identifier for this AcceptanceCriterion
     */
    setID(aString) {
        this.id = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the description instance variable from the receiver's
     * Description column in the database.
     * @param {String} aString The text describing the conditions necessary for
     * satisfying this AcceptanceCriterion.
     */
    setDescription(aString) {
        this.description = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the isAccepted instance variable from the receiver's
     * IsAccepted column in the database.
     * @param {Boolean} aBoolean Whether or not the conditions necessary for
     * satisfying this AcceptanceCriterion have been met to the satisfaction 
     * of the Product Owner.
     */
    setIsAccepted(aBoolean) {
        this.isAccepted = aBoolean;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the backloogItemID instance variable from the receiver's
     * BacklogItemID column in the database.
     * @param {String} aString The unique ID for the BacklogItem for which this
     * is an AcceptanceCriterion
     */
    setBacklogItemID(aString) {
        this.backlogItemID = aString;
    }

    /**
     * For subclasses of DatabaseTable where instances are being retrieved from the 
     * database based on something other than the keyColumn, it is necessary to
     * provide a getter function in the form "get + <foreignKey>".
     * 
     * See DatabaseTable.allWhere().
     *  
     * In this case, answer the value of the foreign key "BacklogItemID" so we 
     * can find all of the AcceptanceCriteria for a given BacklogItem.
     * 
     * @returns {String} The foreign key for the BacklogItem's ID.
     */
    getBacklogItemID() {
        return this.backlogItemID;
    }
}