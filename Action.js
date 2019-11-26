class Action extends DatabaseTable {
    name = '';
    extraChecksNeeded = false;
    
    static columns = [
        'Name', 
        'ExtraChecksNeeded'
    ]; 

    setName(aString) {
        this.name = aString;
    }
    setExtraChecksNeeded(aBoolean) {
        this.extraChecksNeeded = aBoolean;
    }
}