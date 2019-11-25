class Assignee extends DatabaseTable {
    id = undefined;
    firstName = '';
    lastName = '';
    shortName = '';
    emailAddress = '';
    color = undefined;

    static keyColumn = 'ID';

    static columns = [
        'ID', 
        'FirstName', 
        'LastName', 
        'ShortName', 
        'EmailAddress', 
        'Color'
    ];

    setID(aNumber) {
        this.id = aNumber;
    }

    setFirstName(aString) {
        this.firstName = aString;
    }

    setLastName(aString) {
        this.lastName = aString;
    }

    setShortName(aString) {
        this.shortName = aString;
    }

    setEmailAddress(aString) {
        this.emailAddress = aString;
    }

    setColor(anObject) {
        this.color = anObject;
    }

}