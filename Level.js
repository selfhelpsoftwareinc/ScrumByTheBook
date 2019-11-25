class Level extends DatabaseTable {
    number = undefined;
    name = '';
    color = undefined;

    static keyColumn = 'Number';
    static columns = [
        'Number', 
        'Name', 
        'Color'
    ]; 

    setNumber(aNumber) {
        this.number = aNumber;
    }

    setName(aString) {
        this.name = aString;
    }

    setColor(anObject) {
        this.color = anObject;
    }

}