class Sprint extends DatabaseTable {
    id = '';
    startDate = undefined;
    duration = undefined;
    backlogItems = null;

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

    loadBacklogItems(){
        this.backlogItems = SprintToBLIMapping.getBLIsFor(this.id);
    }

    // Answer the backlogItems array.  Note that the backlogItems instance
    // variable must be lazy-initialized to avoid getting into a mutual
    // recursion when loading from the database.  (If instead we attempted
    // to #loadBacklogItems() right afer setting the Sprint's ID, as we do
    // when we loadSprints() in BacklogItem>>setID(), Sprint>>loadBacklogItems()
    // would get called in the middle of BacklogItem>>loadSprints(), which would
    // then try to instantiate a Sprint and come right back to 
    // Sprint>>loadBacklogItems().)
    backlogItems() {
        if (this.backlogItems === null) {
            this.loadBacklogItems();
        }
        return this.backlogItems;
    }
}