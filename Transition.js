const DatabaseTable = require("./DatabaseTable.js").DatabaseTable;
const State = require("./State.js").State;
const Action = require("./Action.js").Action;
/**
 * A Transition represents a valid change of State for a BacklogItem.
 * It is defined by its start path and its end state.  The start path 
 * is a valid combination of the start State and the Action, which is 
 * stored in a two-element Array.  The start path is stored in the 
 * database as a hyphen-separated string of state name and action name.
 */
class Transition extends DatabaseTable {

    /**
     * @type {String} As stored in the database, the hyphen-separated
     * start state name and action name.
     */
    startPathString = '';

    /**
     * @type {Array of State and Action} A tuple storing the start
     * State and Action that define this unique transition.
     */
    startPath = [];

    /** 
     * @type {State} The result of making this transition, the end
     * State.
     */
    endState = undefined;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'StartPath', 
        'EndState'
    ]; 
    
    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the startPathString instance variable from the 
     * receiver's StartPathString column in the database.  Then separate
     * the string into its consituent parts and set the startState
     * and action parts of the path.
     * @param {String} aString The unique identifier for this Assignee
     */
    setStartPath(aString) {
        this.startPathString = aString;
        var parts = aString.split('-');
        var actionName = parts.pop();
        var startStateName = parts.pop();
        var startState = State.whereKeyIs(startStateName);
        var action = Action.whereKeyIs(actionName);
        this.startPath = [startState, action];
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the endState instance variable from the receiver's
     * EndState column in the database.  It is stored as a String in the
     * database; convert it into an actual State.
     * @param {String} aString The unique identifier for this Assignee
     */
    setEndState(endStateName) {
        this.endState = State.whereKeyIs(endStateName);
    }
}
module.exports = {Transition}