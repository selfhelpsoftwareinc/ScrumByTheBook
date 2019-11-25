class AcceptanceCriterion extends DatabaseTable {
    id = undefined;
    description = '';
    isAccepted = false;
    backlogItemID = undefined;
  
    static keyColumn = 'ID';
    static columns = [
        'ID', 
        'Description', 
        'IsAccepted', 
        'BacklogItemID'
    ]; 

    static allFor(aBacklogItem) {
        return this.allWhere('BacklogItemID', aBacklogItem.id);
    }

    setID(aNumber) {
        this.id = aNumber;
    }

    setDescription(aString) {
        this.description = aString;
    }

    setIsAccepted(aBoolean) {
        this.isAccepted = aBoolean;
    }

    setBacklogItemID(aNumber) {
        this.backlogItemID = aNumber;
    }

    getBacklogItemID() {
        return this.backlogItemID;
    }
}