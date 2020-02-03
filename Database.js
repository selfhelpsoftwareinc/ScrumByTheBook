const Record = require("./Record.js").Record;
/**
 * The Database class is, for now, a proxy for a real database interface.  It
 * retrieves all the records for any subclass of DatabaseTable, then instantiates
 * each of those records into an instance of that subclass.  Finally, it stores
 * the instances in a Map, keyed by the value of each instance's value of its
 * keyColumn.  That map will be stored in a static variable of the class.
 * 
 * @todo Eventually, Database will perform the same actions using an SQL interface.
 */
class Database {

    /**
     * Retrieve from the database all instances of the receiver class.
     * @param {DatabaseClass} aClass The subclass of DatabaseTable that
     * will be instantiated for each of its records in the database.
     * @returns a Map of all the instances, keyed by each instance's value
     * of the class' keyColumn.
     */
    static loadAllForClass(aClass) {
        var map = new Map();
        var records = Record.recordsFor(aClass.tableName);
        for (var eachRecord of records) {
            var instance = this.instantiateFrom(aClass, eachRecord);
            var keyColumn = aClass.keyColumn;
            map.set(eachRecord.at(keyColumn), instance);
        }
        return map;
    }

    /**
     * Retrieve from the database all instances of the receiver class 
     * where the value in the column named aColumnName matches aValue.
     * @param {DatbaseClass} aClass The subclasss of DatabaseTable that 
     * will be instantiated for each of the records in the database 
     * satisfying the criteria.
     * @param {String} aColumnName The name of the column in which to
     * search for the value.
     * @param {Object} aValue The value for which to search.
     * @returns {Map of DatabaseTable}a Map of all the instances matching the criteria, keyed 
     * by each instance's value of the class' keyColumn.
     * @todo if loaded, should we perhaps also search the records already
     * loaded instead of hitting the database for all records?  The issue
     * is that instantiating a new instance from the database will answer
     * a different object than those already instantiated.
     */
    static loadAllForClassWhere(aClass, aColumnName, aValue) {
        var map = new Map();
        var records = Record.recordsWhere(aClass.tableName, aColumnName, aValue);
        for (var eachRecord of records) {
            var instance = this.instantiateFrom(aClass, eachRecord);
            var keyColumn = aClass.keyColumn;
            map.set(eachRecord.at(keyColumn), instance);
        }
        return map;
    }

    /**
     * Create an instance of aClass from the data in aRecord.
     * @param {DatbaseClass} aClass The subclass of DatabaseClass to
     * instantiate.
     * @param {Record} aRecord The database record containing the data
     * for the instance.
     * @returns an instance of aClass
     * @private
     */
    static instantiateFrom(aClass, aRecord) {
        var instance = new aClass();
        var columns = aClass.columns;
        for (var eachColumnName of columns) {
            var value = aRecord.at(eachColumnName);
            var setterFunction = this.setterFunctionFor(eachColumnName, aClass);
            setterFunction.call(instance, value);
        }
        return instance;
    }

    /**
     * Find and return the setter function in aClas that matches aColumnName.
     * @param {String} aColumnName // The name of the column in the database
     * that will be set in the instance using the setterFunction.
     * @param {DatabaseClass} aClass // The subclass of DatabaseClase that
     * is having one of its properties set using the setterFunction
     * @returns the function of aClass that sets thre property aColumnName.
     * @private
     * @todo Invoke a real error if the function is not found, rather than 
     * output to the console.
     */
    static setterFunctionFor(aColumnName, aClass) {
        var setterFunctionName = "set" + aColumnName;
        var setterFunction = aClass.prototype[setterFunctionName];
        if (setterFunction == undefined) {
            console.log("For class: " + aClass.name, 
            " Undefined setter function: " + setterFunctionName);
        }
        return setterFunction;
    }
}
module.exports = {Database}