/**
 * A CardSort represents ways in which to sort cards in Card View.
 * These will be rendered as menu choices for ways in which to 
 * sort the cards.
 * The user can sort either by direct properties of the BacklogItem
 * (e.g., sort by BacklogItem due dates); or sort by the most recent
 * transition from a BacklogItem's change history (e.g, sort by a 
 * transition from the Added state using the Mark Ready action.) Hence,
 * all CardSorts contain a Boolean to indicate whether or not the
 * CardSort is a transition; if so, the CardSort will look for more
 * information (start state and action from which to construct an actual
 * Transition object).
 */
class CardSort extends DatabaseTable {

    /**
     * @type {String} the name of the property in the BacklogItem
     * on which to sort.
     */
    name = '';

    /**
     * @type {Boolean} whether or not the CardSort represents a
     * state transition.
     */
    isTransition = false;

    /**
     * @type {Transition} the Transition instance that is constructed
     * from the startStateName and actionName stored in the database.
     */
    transition = undefined;

    /**
     * @type {String} the name of the start state for CardSorts
     * that represent a transition.
     */
    transitionStartStateName = undefined;

    /**
     * @type {String} the name of the action representing the
     * transition of CardSorts that represent a transition.
     */
    transitionActionName = undefined;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     * @todo Check to see if the Name is really a valid key here: is there 
     * moree than one kind of Transition sort?  May need a proper ID key.    
     */
    static columns = [
        'Name', 
        'IsTransition', 
        'TransitionStartStateName', 
        'TransitionActionName'
    ]; 

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the name instance variable from the receiver's
     * Name column in the database.
     * @param {String} aString The unique identifier for this CardSort
     */
    setName(aString) {
        this.name = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the isTransition instance variable from the receiver's
     * IsTransition column in the database.
     * @param {Boolean} aBoolean Whether or not this CardSort is a transition
     */
    setIsTransition(aBoolean) {
        this.isTransition = aBoolean;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the transitionStartStateNeme instance variable 
     * from the receiver's TransitionStartStateName column in the database.
     * Then if we have all we need to create an actual Transition object
     * do that.
     * @param {String} aString The start state name if this CardSort is a 
     * transition.
     */
    setTransitionStartStateName(aString) {
        this.transitionStartStateName = aString;
        if (this.transitionActionName != undefined) {
            this.setTransition();
        }
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the transitionActionNeme instance variable 
     * from the receiver's TransitionActionName column in the database.
     * Then if we have all we need to create an actual Transition object
     * do that.
     * @param {String} aString The action name if this CardSort is a 
     * transition.
     */
    setTransitionActionName(aString) {
        this.transitionActionName = aString;
        if (this.transitionStartStateName != undefined) {
            this.setTransition();
        }
    }

    /**
     * If this CardSort is a Transition, and if we have both parts of the information
     * that we need to create the Transition object (start state name and action
     * name), find and store the corresponding Transition.
     */
    setTransition() {
        var allTransitions = Transition.allInstances();
        var key = this.transitionStartStateName + '-' + this.transitionActionName;
        this.transition = allTransitions.get(key);
    }
}