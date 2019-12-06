/**
 * The Assignee class represents the 0 or more persons to whom a BacklogItem 
 * can be assinged.  Zero, because the project may be so small that the user
 * does not want to bother with assigning tasks; more than one in case the 
 * user is doing, say, pair programming, where more than one person can be
 * working on a BacklogItem simultaneously.
 * 
 * The Assignees are linked to the BacklogItems in an N-to-N relationship via
 * the AssigneeToBLIMapping class.
 */
class Assignee extends DatabaseTable {

    /**
     * @type {String} the unique identifier for an Assignee in the database
     */
    id = undefined;

    /**
     * @type {String} the first name of the Assignee
     */
    firstName = '';

    /**
     * @type {String} the last name of the Assignee
     */
    lastName = '';

    /**
     * @type {String} some short designation for the Assignee; may be, for
     * example, the first, middle, and last initials
     */
    shortName = '';

    /**
     *  @type {String} the primary email address for the Assignee.
     * 
     */
    emailAddress = '';

    /**
     * @type {Object} to visually distinguish this Assignee from others in the
     * user interface, add a color to this assignee's BacklogItems.
     * @todo Initially encoded as a string; make into a real color
     */
    color = undefined;

    /**
     * @type {Array of BacklogItems} all of the Backlog items to which this
     * Assignee is assigned
     */
    backlogItems = [];

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'ID', 
        'FirstName', 
        'LastName', 
        'ShortName', 
        'EmailAddress', 
        'Color'
    ];

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
     * In this case, set the firstName instance variable from the receiver's
     * FirstName column in the database.
     * @param {String} aString The first name of the Assignee
     */
    setFirstName(aString) {
        this.firstName = aString;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the lastName instance variable from the receiver's
     * LastName column in the database.
     * @param {String} aString The last name of the Assignee
     */
    setLastName(aString) {
        this.lastName = aString;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the shortName instance variable from the receiver's
     * ShortName column in the database.
     * @param {String} aString The short name of the Assignee
     */
    setShortName(aString) {
        this.shortName = aString;
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the emailAddress instance variable from the receiver's
     * EmailAddress column in the database.
     * @param {String} aString The email address of the Assignee
     */
    setEmailAddress(aString) {
        this.emailAddress = aString;
    }

     /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the color instance variable from the receiver's
     * Color column in the database.
     * @param {String} aString The color for the Assignee
     * @todo initially encoded as a color name string; change to a real color
     */
    setColor(anObject) {
        this.color = anObject;
    }

    /**
     * When the BacklogItem is read from the database, once it has its ID, it
     * can go to the AssigneeToBLIMapping class and find all of the Assignees
     * mapped to its own ID.  As it adds each of those as its Assignees, it tells
     * each Assignee to add itself to the Assignee's backlogItems collection.  
     * This is part of the initial setup/read from the database.  
     * 
     * During the course of operation, if an Assignee is added to a BacklogItem,
     * that BacklogItem will, in turn, as the Assignee to add itself to the 
     * Assignee's collection of backlogItems.
     * @param {BacklogItem} aBacklogItem 
     */
    addBacklogItem(aBacklogItem) {
        this.backlogItems.push(aBacklogItem);
    }
}