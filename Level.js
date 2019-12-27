/**
 * A Level is how deeply a BacklogItem is nested from the top
 * of the hierarchy.  Each level of depth can be named.  E.g., 
 * 'Epic,' 'Story,' 'Task,' 'Subtask.'  The names are settable 
 * by the user, and there is no limit to the number of levels.
 * Each level can also have a color assigned to it to help
 * visually distinguish it from other levels in the user interface.
 */
class Level extends DatabaseTable {
    /**
     * @type {Number} how deeply nested a level is from the top
     * of the hierarchy.  A BacklogItem with no parent BacklogItem
     * is at level 0.
     */
    number = undefined;

    /**
     * @type {String} the user-settable name associated with this
     * depth of nesting.  E.g., 'Epic' or 'Story'.
     */
    name = '';

    /** 
     * @type {String} the name of the color associated with this
     * level to visually distinguish it from other levels in the UI.
     * @todo figure out how to make this a real color, rather than
     * a String.
     */
    color = undefined;

    
    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'Number', 
        'Name', 
        'Color'
    ]; 

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the number instance variable from the receiver's
     * Number column in the database.
     * @param {Number} aNumber how deeply this level is nested
     */
    setNumber(aNumber) {
        this.number = aNumber;
    }

    
    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the name instance variable from the receiver's
     * Name column in the database.
     * @param {String} aString The user-settable label for this level
     */
    setName(aString) {
        this.name = aString;
    }

    
    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the color instance variable from the receiver's
     * Color column in the database.
     * @param {String} anObject the color of this level in the UI
     * @todo figure out how to make this a real color, rather than a String
     */
    setColor(anObject) {
        this.color = anObject;
    }

}