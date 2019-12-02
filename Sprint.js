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
    }

    setStartDate(aString) {
        this.startDate = aString;
    }

    setDuration(aNumber) {
        this.duration = aNumber;
    }

    /* This may not get used, since the BLI's call #addBacklogItem() when 
     * they loadSprints()
     */
    loadBacklogItems(){
        this.backlogItems = SprintToBLIMapping.getBLIsFor(this.id);
    }

    addBacklogItem(aBacklogItem) {
        this.backlogItems.push(aBacklogItem);
    }
}