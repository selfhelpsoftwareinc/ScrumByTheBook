const DatabaseTable = require("./DatabaseTable.js").DatabaseTable;
/**
 * The Preference class provides a framework for storing and retrieving 
 * user preferences to/from the database.  These include setting like
 * Sprint Duration, whether or not to use average velocity in estimates,
 * or a manually set velocity estimate, whether to use Fibonacci numbers
 * for point values, etc.
 */
class Preference extends DatabaseTable {

    /**
     * @type {String} The name for the preference
     */
    preferenceType = '';

    /**
     * @type {Object} The value for the preference.  May be a string
     * value, a date, a boolean value....
     */
    preference = undefined;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'PreferenceType',
        'Preference'
    ];

    /**
     * Answer the preference value, given its name.
     * @param {String} preferenceName 
     * @returns {Preference}
     */
    static preferenceAt(preferenceName) {
        return (this.instances.get(preferenceName)).preference;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the preferenceType instance variable from the receiver's
     * PreferenceType column in the database.
     * @param {String} aString The name of this Preference
     */
    setPreferenceType(aString) {
        this.preferenceType = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the preference instance variable from the receiver's
     * Preference column in the database.
     * @param {Object} anObject The value of this Preference
     */
    setPreference(anObject) {
        this.preference = anObject;
    }
}

module.exports = {Preference}