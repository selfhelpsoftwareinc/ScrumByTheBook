class BLIChange extends DatabaseTable {
    id = undefined;
    date = undefined;
    stateName = undefined
    state = undefined;
    backlogItemID = undefined;

    static keyColumn = 'ID';

    static columns = [
        'ID', 
        'Date', 
        'StateName', 
        'BacklogItemID'
    ]; 
    setID(aNumber) {
        this.id = aNumber;
    }

    setDate(aDate) {
        this.date = aDate;
    }

    setStateName(aString) {
        this.stateName = aString;
        this.state = State.whereKeyIs(aString);
    }

    setBacklogItemID(aNumber) {
        this.backlogItemID = aNumber;
    }

}