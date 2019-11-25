class GroupCriterion extends DatabaseTable {
    name = '';
    isLevel = false;
    isChange = false;
    limitValuesToSprint = false;
    level = undefined;
    stateName = undefined;

    static keyColumn = 'Name';
    static columns = [
        'Name', 
        'IsLevel', 
        'IsChange', 
        'LimitValuesToSprint', 
        'Level', 
        'State'
    ]; 

    setName(aString) {
        this.name = aString;
    }
    setIsLevel(aBoolean) {
        this.isLevel = aBoolean;
    }
    setIsChange(aBoolean) {
        this.isChange = aBoolean;
    }
    setLimitValuesToSprint(aBoolean) {
        this.limitValuesToSprint = aBoolean;
    }
    setLevel(aString) {
        this.level = aString;
    }
    setState(aString) {
        this.stateName = aString;
    }
}