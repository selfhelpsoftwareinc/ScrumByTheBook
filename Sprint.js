/**
 * A Sprint represents a fixed-length period of time during which a
 * potentiatlly-shippable deliverable is developed.  During Sprint 
 * Planning, a collection of BacklogItems are assigned to the Sprint.
 */
class Sprint extends DatabaseTable {

    /**
     * @type {String} The unique identifier for this Sprint in the 
     * database.
     */
    id = '';

    /**
     * @type {String} A string representing the date at which this 
     * Sprint starts
     * @todo Decide whether to make this an actual Date, or continue
     * to keep it as a String in the Sprint.
     */
    startDate = undefined;

    /**
     * @type {Number} How long the Sprint lasts, in number of days
     */
    duration = undefined;

    /**
     * @type {Array of BacklogItems} The collection of BacklogItems
     * planned to be completed during this Sprint.
     */
    backlogItems = [];

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'ID',
        'StartDate', 
        'Duration'
    ]; 

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the id instance variable from the receiver's
     * ID column in the database.
     * @param {String} aString The unique identifier for this Sprint
     */
    setID(aString) {
        this.id = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the startDate instance variable from the receiver's
     * StartDate column in the database.
     * @param {String} aString The date at which this Sprint starts
     */
    setStartDate(aString) {
        this.startDate = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the duration instance variable from the receiver's
     * Duration column in the database.
     * @param {String} aString How long this Sprint lasts, in days
     */
    setDuration(aNumber) {
        this.duration = aNumber;
    }

    /**
     * This may not get used, since the BLI's call #addBacklogItem() when 
     * they loadSprints()
     */
    loadBacklogItems(){
        this.backlogItems = SprintToBLIMapping.getBLIsFor(this.id);
    }

    /**
     * Add a BacklogItem to this Sprint's collection of BacklogItems.
     * @param {BacklogItem} aBacklogItem 
     */
    addBacklogItem(aBacklogItem) {
        this.backlogItems.push(aBacklogItem);
    }
}