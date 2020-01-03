const DatabaseTable = require("./DatabaseTable.js").DatabaseTable;
/**
 * A GroupCriterion represents one way in which to group BacklogItems
 * in Card View.  A collection of GroupCriteria together will
 * specify finer and finer levels of granularity of the groupings.
 * For example, a user might want to see all of the tasks in a 
 * Sprint grouped first by Assignee (so s/he can see all of his/her
 * tasks grouped together first), then by Due Date (so s/he can see
 * all of the most urgent tasks first), then by State (to see the
 * tasks in To Do, Doing, and Done groups).  
 * 
 * Furthermore, tasks can be grouped by level (e.g., all Epics grouped
 * together); or by change (e.g., all @todo WHAT DID I MEAN BY THIS!?).
 * Therefore, there are Booleans in a GroupCriterion to indicate whether
 * the criterion is a level grouping or a change grouping.
 * 
 * Finally, there is a Boolean to indicate whether or not the values
 * in the group should be limited to those values in the Sprint.  E.g.,
 * you might want empty groups for assignees not in the sprint so 
 * you can see that a particular assignee's group is empty.  But you
 * would not want to see empty due dates for dates not in the Sprint.
 */
class GroupCriterion extends DatabaseTable {

    /**
     * @type {String} the part of the BacklogItem to use to create
     * the group.
     */
    name = '';

    /** 
     * @type {Boolean} whether or not this group is grouped by level
     */
    isLevel = false;

    /**
     * @type {Boolean} whether or not this group is grouped by change
     */
    isChange = false;

    /**
     * @type {Boolean} whether or not to show only groups whose values
     * are contained within the Sprint.  E.g., for a Due Date grouping,
     * you would not want to see groups for dates outside the Sprint.
     */
    limitValuesToSprint = false;

    /** 
     * @type {String} the name of the level of the group (e.g., 'Epic')
     * or 'settable' meaning the user can choose a level from a menu.
     */
    level = undefined;

    /**
     * @todo comment this when I remember what it's for
     */
    stateName = undefined;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'Name', 
        'IsLevel', 
        'IsChange', 
        'LimitValuesToSprint', 
        'Level', 
        'State'
    ]; 

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the name instance variable from the receiver's
     * Name column in the database.
     * @param {String} aString The unique identifier for this GroupCriterion
     */
    setName(aString) {
        this.name = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the isLevel instance variable from the receiver's
     * IsLevel column in the database.
     * @param {Boolean} aBoolean The Boolean for whether or not this group
     * is a level grouping.
     */
    setIsLevel(aBoolean) {
        this.isLevel = aBoolean;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the isChange instance variable from the receiver's
     * IsChange column in the database.
     * @param {Boolean} aBoolean The Boolean for whether or not this group
     * is a change grouping.
     */
    setIsChange(aBoolean) {
        this.isChange = aBoolean;
    }
    
    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the limitValuesToSprint instance variable from the receiver's
     * LimitValuesToSprint column in the database.
     * @param {Boolean} aBoolean The Boolean for whether or not this group uses
     * values that are only contained within this Sprint.
     */
    setLimitValuesToSprint(aBoolean) {
        this.limitValuesToSprint = aBoolean;
    }
        
    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the level instance variable from the receiver's
     * Level column in the database.
     * @param {String} aString the name of the level of the group (e.g., 'Epic')
     * or 'settable' meaning the user can choose a level from a menu.
     */
    setLevel(aString) {
        this.level = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the state instance variable from the receiver's
     * State column in the database.
     * @todo comment this when we remember what it is
     * @param {String} aString 
     */
    setState(aString) {
        this.stateName = aString;
    }
}

module.exports = {GroupCriterion}