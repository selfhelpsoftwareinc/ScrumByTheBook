const DatabaseTable = require("./DatabaseTable.js").DatabaseTable;
/**
 * The SystemContant class stores to and retrieves from the database 
 * all values maintained by the system, primarily the last-used
 * ID values for DatabaseTable descendants that use generated unique
 * ID's.
 */
class SystemConstant extends DatabaseTable {

    /**
     * @type {String} The name of the constant and its unique ID in the 
     * Database.
     */
    systemValueType = '';

    /**
     * @type {Object} The value of the constant, which may be a String,
     * a Number, or a Boolean.
     */
    systemValue = undefined;

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'SystemValueType', 
        'SystemValue', 
    ]; 

    /**
     * Answer the SystemConstant for a given constant name.
     * @param {String} typeName 
     * @returns {SystemConstant}
     */
    static valueAt(typeName) {
        console.log(this.instances.get(typeName));
        return this.instances.get(typeName).systemValue;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the systemValueType instance variable from the 
     * receiver's SystemValueType column in the database.
     * @param {String} aString The name of this constant.
     */
    setSystemValueType(aString) {
        this.systemValueType = aString;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the systemValue instance variable from the 
     * receiver's SystemValue column in the database.
     * @param {String} aString The value of this constant.
     */    
    setSystemValue(anObject) {
        this.systemValue = anObject;
    }

}
module.exports = {SystemConstant}