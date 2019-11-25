class Action extends DatabaseTable {
    name = '';
    extraChecksNeeded = false;

    static keyColumn = 'Name';
    
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