/**
 * The State class represents any of several states that a BacklogItem can
 * be in at a given time.  E.g., it can be newly added to the project ('Added'),
 * currently in process ('Doing'), fully tested and accepted by the Project
 * Owner ('Accepted').
 * 
 * The user team can decide whether or not they want to track any of the States
 * by setting the include flag for that State.  Also, some States will be 
 * included in point calculations for what still needs to be done.  This can be
 * set by the team with the includeInPipelilne flag.  Similarly, some states 
 * will be included in point calculations for velocity (and average velocity).
 * The team can set which states to include in velocity calculations using
 * the includeInVelocity flag.
 * 
 * Finally, each State can have a color associated with it for distinguishing
 * it in the user interface.
 */
class State extends DatabaseTable {

    /**
     * @type {String} The unique identifier for the State, which also identifies
     * it in the user interface.
     */
    name = '';

    /**
     * @type {String} The color assoicated with the State for distinguishing it
     * in the UI.
     */
    color = undefined;

    /**
     * @type {Boolean} Whether or not the team wants to track this state in
     * their process.
     */
    include = true;

    /**
     * @type {Boolean} Whether or not to include this state in calculating
     * how much work is yet to be done.
     */
    includeInPipeline = false;

    /**
     * @type {Boolean} Whether or not to include this state in calculating
     * velocity and average velocity.
     */
    includeInVelocity = false;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'Name', 
        'Color', 
        'Include',
        'IncludeInPipeline', 
        'IncludeInVelocity'
    ];

    static ValidStates = {
        DEAD: 'Dead',
        BLOCKED: 'Blocked',
        ONHOLD: 'On Hold',
        ADDED: 'Added',
        READY: 'Ready',
        TODO: 'To Do',
        DOING: 'Doing',
        DONE: 'Done',
        TESTED: 'Tested',
        ACCEPTED: 'Accepted',
        PREVIOUS: 'Previous'
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the name instance variable from the receiver's
     * Name column in the database.
     * @param {String} aString The name of the State, and the unique identifier for the
     * State in the database.
     */
    setName(aString) {
        this.name = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the color instance variable from the receiver's
     * Color column in the database.
     * @param {String} aString The color used to distinguish this State in
     * the UI.
     * @todo Figure out whether to keep this as a String or if there is
     * a first class Color object somewhere.
     */    
    setColor(aString) {
        this.color = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the include instance variable from the receiver's
     * Include column in the database.
     * @param {Boolean} aBoolean Whether or not to track this State in the
     * team's process
     */        
    setInclude(aBoolean) {
        this.include = aBoolean;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the includeInPipeline instance variable from the 
     * receiver's IncludeInPipeline column in the database.
     * @param {Boolean} aBoolean Whether or not to include this state in 
     * calculating how much work is yet to be done.
     */        
    setIncludeInPipeline(aBoolean) {
        this.includeInPipeline = aBoolean;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the includeInPipeline instance variable from the 
     * receiver's IncludeInPipeline column in the database.
     * @param {Boolean} aBoolean Whether or not to include this state in 
     * calculating velocity and average velocity.
     */        
    setIncludeInVelocity(aBoolean) {
        this.includeInVelocity = aBoolean;
    }

    /**
     * Answer whether or not this state constitutes a completed state
     * for a BacklogItem.  A BacklogItem is complete if its state is
     * Done, Tested, or Accepted.
     * @returns {Boolean} whether this state is beyond the 'Doing' state
     */
    isComplete() {
        return [
            this.prototype.ValidStates.DONE,
            this.prototype.ValidStates.ACCEPTED,
            this.prototype.ValidStates.TESTED
        ].includes(this.name);
    }

    /**
     * Answer whether or not this is in the 'Done' state.
     * @returns {Boolean} whether this state is in the 'Done' state
     */
    isDone() {
        return this.name == this.prototype.ValidStates.DONE;
    }

}