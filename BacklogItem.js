
class BacklogItem extends DatabaseTable {
    id = undefined;
    priority = undefined;
    title = '';
    description = '';
    dueDate = undefined;
    parentID = undefined;
    isTemplate = false;
    sprints = undefined;
    acceptanceCriteria = new Map();
    parentBLI = undefined;
    children = new Map();

    // history = new BLIChangeHistory;

    static keyColumn = 'ID';
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
    
    static loadFromDatabase() {
        super.loadFromDatabase();
        this.connectParents();
    }
    static connectParents() {
        for (var [eachBLIID, eachBLI] of this.instances) {
            var eachParentID = eachBLI.parentID;
            if (eachParentID != undefined) {
                eachBLI.setParentBLI(this.instances.get(eachParentID));
            }
        }
    }

    setID(aNumber) {
        this.id = aNumber;
        this.loadAcceptanceCriteria();
        this.loadSprints();
    }

    setPriority(aNumber) {
        this.priority = aNumber;
    }

    setTitle(aString) {
        this.title = aString;
    }

    setDescription(aString) {
        this.description = aString;
    }

    setDueDate(aDate) {
        this.dueDate = aDate;
    }

    setParentID(aNumber) {
        this.parentID = aNumber;
    }
    
    setIsTemplate(aBoolean) {
        this.isTemplate = aBoolean;
    }

    setPoints(aNumber) {
        this.history = BLIChangeHistory.historyFor(this, aNumber);
    }

    loadAcceptanceCriteria() {
        this.acceptanceCriteria = AcceptanceCriterion.allFor(this);
    }
    loadSprints() {

    }

    setParentBLI(aBLI) {
        this.parentBLI = aBLI;
        this.parentBLI.addChild(this);
    }

    addChild(aBLI) {
        this.children.set(aBLI.backlogItemID, aBLI);
    }

    getID() {
        return this.id;
    }

}

