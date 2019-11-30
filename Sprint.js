class Sprint extends DatabaseTable {
    id = '';
    startDate = undefined;
    duration = undefined;
    backlogItems = [];

    static columns = [
        'ID',
        'StartDate', 
        'Duration'
    ]; 

    static allFor(aBacklogItem) {
        answer 
    }

    setID(aString) {
        this.id = aString;
        this.loadBacklogItems();
    }

    setStartDate(aString) {
        this.startDate = aString;
    }

    setDuration(aNumber) {
        this.duration = aNumber;
    }

    loadBacklogItems(){
        this.backlogItems = SprintToBLIMapping.getBLIsFor(this.id);
    }
}