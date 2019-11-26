class Sprint extends DatabaseTable {
    id = '';
    startDate = undefined;
    duration = undefined;

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
}