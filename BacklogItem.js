/**
 * A BacklogItem represents *anything* that needs to be done on a project,
 * at any level of abstraction or detail.  It can represent anything from
 * a vague theme of something that might, someday, need to be done on the 
 * project, to a sub-sub-sub-task.  (The user determines how many levels
 * of detail to track, depending on how deeply they nest BacklogItems within
 * their parent BacklogItems.)
 * 
 * A BacklogItem has, at most, one parent, where the parent represents a
 * higher level of abstraction.  A Backlog item with no parent is at the
 * highest level of abstraction.
 */
class BacklogItem extends DatabaseTable {

    /**
     * @type {String} a unique identifier for this instance of the BacklogItem, 
     * and the only attribute of the BacklogItem that is absolutely required; 
     * assigned internally when the BacklogItem is created, and stored in the
     * database as the primary key.
     */
    id = '';

    /**
     * @type {Number} the priority of the BacklogItem, where the lower the number,
     * the higher the priority
     */
    priority = undefined;

    /**
     * @type {String} a concise title for the BacklogItem
     */
    title = '';

    /**
     * @type {String} a more detailed elaboration of the BacklogItem
     */
    description = '';

    /** 
     * @type {Date} The date the item is due to be completed, if the user is
     * tracking due dates.
     */
    dueDate = undefined;

    /**
     * @type {String or undefined} If the BacklogItem is at the highest level
     * of abatration, it will have no parent, and the parentID will be undefined;
     * otherwise, the parendID will be the unique ID of the BacklogItem that 
     * serves as the parent for this BacklogItem.
     * 
     * It is necessary to store the parentID when the item is loaded from the
     * database only temporarily.  It is soon replaced with a reference to the
     * actual parentBacklogItem.  See the static method connectParents().
     */
    parentID = undefined;

    /**
     * @type {Boolean} A BacklogItem can optionally act as a template.  The user
     * can fill out fields in a template BacklogItem, then make copies of the
     * template for use as real BacklogItems.  A template BacklogItem will not
     * be assigned to sprints.  Defaults to false (not a template).
     */
    isTemplate = false;

    /**
     * @type {Array of Sprints or undefined} Once a BacklogItem becomes activated, 
     * it goes into a Sprint, where it can be actively worked on.  If, for some
     * reason, a BacklogItem is not completed within a Sprint, it can be
     * assinged to another, subsequent Sprint.  Therefore, there is an n-to-n
     * relationship between BacklogItems and Sprints: a Sprint typically has more 
     * than one BacklogItem, and a BacklogItem can be in more than one Sprint.  
     * So if a BacklogItem has not yet been assigned, this instance variable
     * will be undefined; after it has been assigned, sprints will be an Array
     * containing one or more Sprints.
     */
    sprints = undefined;

    /**
     * @type {Map of AcceptanceCriteria} For a BacklogItem to move from the Tested
     * state to the Accepted state, the team may wish to have a collection of 
     * AcceptanceCriteria -- tests that the Product Ownder has established must
     * pass prior to the BacklogItem being accepted. This map is keyed by the 
     * AcceptanceCriterion's id, with each value the AcceptanceCriterion.
     */
    acceptanceCriteria = new Map();

    /** 
     * @type {String or undefined} For any BacklogItem at the highest level of
     * abstraction, the parentBacklogItem will be undefined.  For all others, the 
     * parentBacklogItem will be the BacklogItem who is the next higher level of 
     * abstraction above this BacklogItem.
     */
    parentBacklogItem = undefined;

    /**
     * @type {Map of BcklogItems} The children of a BacklogItem are all BacklogItems
     * that have this BacklogItem as a parent.  The Map is keyed by the unique ID
     * of each child BacklogItem, with the value the child BacklogItem.
     * 
     * Note that BacklogItems without children (leaf BacklogItems) behave quite 
     * differently in many cases than those with children.
     */
    children = new Map();

    /**
     * @type {BLIChangeHistory} The BLIChangeHistory tracks every state change
     * of the BacklogItem.
     */
    history = undefined;

    /**
     * @type {Array of Assignees} For teams that track who is assinged to each
     * BacklogItem, this array holds the list of individuals assigned
     * to this task.  Note that there can be more than one assignee on a task
     * when teams employ pair programming or other team efforts.  Therefore,
     * there can exist an n-to-n relationship between BacklogItems and Assignees. 
     * For teams that don't wish to track assignees, this array will be empty.
     */
    assignees = [];
    
    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'ID', 
        'Priority',
        'Title', 
        'Description', 
        'DueDate', 
        'ParentID', 
        'IsTemplate', 
        'Points'
    ];
    
    /**
     * @override Load the records from the database, and also create the internal
     * relationships between parent BacklogItems and their child BacklogItems.
     */
    static loadFromDatabase() {
        super.loadFromDatabase();
        this.connectParents();
    }

    /**
     * @private Go through all of the instances loaded from the database,
     * and for every one that has a parentID, tell that instance to set
     * its parentBacklogItem to the actual BacklogItem with that ID.
     */
    static connectParents() {
        for (var [eachBLIID, eachBLI] of this.instances) {
            var eachParentID = eachBLI.parentID;
            if (eachParentID != undefined) {
                eachBLI.setParentBLI(this.instances.get(eachParentID));
            }
        }
    }

   /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the id instance variable from the receiver's
     * ID column in the database.  In addition, once the receiver's ID is known
     * it can use that information to load its acceptanceCriteria, sprints,
     * and assignees.
     * @param {String} aString The unique identifier for this AcceptanceCriterion
     */
    setID(aString) {
        this.id = aString;
        this.loadAcceptanceCriteria();
        this.loadSprints();
        this.loadAssignees();
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the priority instance variable from the receiver's
     * Priority column in the database.
     * @param {Number} aNumber The number indicating this BacklogItem's priority;
     * the lower the number, the higher the priority.
     */
    setPriority(aNumber) {
        this.priority = aNumber;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the title instance variable from the receiver's
     * Title column in the database.
     * @param {String} aString The concise title for this BacklogItem
     */
    setTitle(aString) {
        this.title = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the description instance variable from the receiver's
     * Description column in the database.
     * @param {String} aString The verbose description of what this BacklogItem
     * entails.
     */
    setDescription(aString) {
        this.description = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the dueDate instance variable from the receiver's
     * DueDate column in the database.
     * @param {Date} aDate The date at which this BacklogItem is due to be
     * completed
     */
    setDueDate(aDate) {
        this.dueDate = aDate;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the parentID instance variable from the receiver's
     * ParentID column in the database.
     * @param {String} aString The unique identifier for the BacklogItem, if
     * any, serving as this BacklogItem's parent.
     */
    setParentID(aString) {
        this.parentID = aString;
    }
    
    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the isTemplate instance variable from the receiver's
     * IsTemplate column in the database.
     * @param {Boolean} aBoolean Whether or not this BacklogItem acts as a 
     * template
     */
    setIsTemplate(aBoolean) {
        this.isTemplate = aBoolean;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, the Points column name stores the points (an abstract,
     * relative measure of the level of effort) for a BacklogItem
     * in the database, but the BacklogItem does not store the points directly;
     * instead, the points are stored as part of the BLIChangeHistory.  Once
     * we know the points, we can set up our change history.
     * @param {Number} aNumber The abstract, relative measure of the level of
     * effort for this BacklogItem
     * @todo Make sure this still works for non-leaf BLIs who may have no
     * points recorded in the database.
     */
    setPoints(aNumber) {
        this.history = BLIChangeHistory.historyFor(this, aNumber);
    }

    /** 
     * @private
     * When loading from the database, once we know the BacklogItem ID,
     * we can load all the AcceptanceCriteria, if any associated with 
     * this BacklogItem.  Load those from the databse, too.
     */
    loadAcceptanceCriteria() {
        this.acceptanceCriteria = AcceptanceCriterion.allFor(this);
    }

    /**
     * @private
     * When loading from the database, once we know the BacklogItem ID, 
     * we can load all of the Sprints, if any, for which this BacklogItem
     * is scheduled.  Because sprints and backlogItems exist in an n-to-n
     * relationship, this must be done through the SprintToBLIMapping class.
     */
    loadSprints() {
        this.sprints = SprintToBLIMapping.getSprintsFor(this.id);
        for (var sprint of this.sprints) {
            sprint.addBacklogItem(this);
        }
    }
    
    /**
     * @private
     * When loading from the database, once we know the BacklogItem ID, 
     * we can load all of the Assignees, if any, to which this BacklogItem
     * is assigned.  Because assignees and backlogItems exist in an n-to-n
     * relationship, this must be done through the AssigneeToBLIMapping class.
     */
    loadAssignees() {
        this.assignees = AssigneeToBLIMapping.getAssigneesFor(this.id);
        for (var assignee of this.assignees) {
            assignee.addBacklogItem(this);
        }
    }

    /**
     * @private
     * When loading from the database, once all items are loaded, the
     * relationships between the child BacklogItems and their parents 
     * can be established.  This is done by setting the parentBacklogItem,
     * then telling that parent to add the receiver to the parent's
     * children collection.
     * This method will also be called any time a BacklogItem is added
     * as a child of another BacklogItem, or is reorganized to have
     * a particular parent.
     * @param {BacklogItem} aBLI 
     */
    setParentBLI(aBLI) {
        this.parentBacklogItem = aBLI;
        this.parentBacklogItem.addChild(this);
    }

    /**
     * Add aBLI as a child backlogItem of the receiver.  Add it to the 
     * Map of children BacklogItems, keyed by each child's ID.
     * @param {BacklogItem} aBLI 
     */
    addChild(aBLI) {
        this.children.set(aBLI.id, aBLI);
    }

    /**
     * To search for objects in the database who have a particular BacklogItem,
     * they need to search based on the unique ID of the BacklogItem.  E.g., to 
     * search for all Assignees assigned to a BacklogItem, they need to look for
     * Assignees referencing the BackogItem's ID as a foreign key.  This is an
     * example of a getterFunction constructed in DatabaseTable.getterFunctionFor().
     * @returns {String} the unique ID of the BacklogItem
     */
    getID() {
        return this.id;
    }

    /**
     * Answer whether or not this BacklogItem is at the bottom of the
     * tree (i.e., has no children).
     * @returns {Boolean}
     */
    isLeaf() {
        return this.children.size = 0
    }

    /**
     * Answer whether or not this BacklogItem is past the 'Doing' state.
     * A BacklogItem is complete if it is a leaf BacklogItem and it is
     * in the Done, Tested or Accepted state, or if it is a parent BacklogItem
     * all of whose children are in one of those states.
     * @returns {Boolean}
     */
    isComplete() {
        if (this.isLeaf()) {
            return this.history.isComplete();
        }
        var isComplete = true;
        for (var child of this.children) {
            isComplete = isComplete && child.isComplete();
        }
        return isComplete;
    }

    pointsComplete() {
        if (this.isLeaf()) {
            return this.history.pointsComplete();
        }
        var points = 0;
        for (var child of this.children) {
            points = points + child.pointsComplete();
        }
        return points;
    }

}

