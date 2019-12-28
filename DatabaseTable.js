/**
 * The superclass of all ScrumByTheBook classes that will be stored in the database.
 * Allows for the generic retrieval and storage of instances from/to the database,
 * and matches column names to those of the class' database table.
 * Stores all of the class' instances in a Map (keyed by the class' keyColumn value)
 * to enable quick access to the instances. 
 * 
 * The following protocol must be followed by all subclasses of DatabaseTable for 
 * them to function properly:
 * 
 * 1. They must set columns to be an array of all column names that get stored 
 * in the database for the class.  Column names are capitalized.
 * 2. They must, at a minimum, create instance variables for each of the columns
 * stored in the database for the class.
 * 3. They must create instance methods that set each property stored in the 
 * database.  These must follow the naming pattern "set + ColumnName()".  E.g.,
 * if a columnName is "Title" the setter method must be called "setTitle()" allowing
 * the Database class to construct setter methods when instantiating the class.
 */
class DatabaseTable {
    /**
     * Indicates whether we have done an initial load from the database
     * @protected
     * @type {Boolean}
     */
    static isLoaded = false; 

    /**
     * Holds onto all of the class' instances, both loaded from the database and
     * added later.
     * @type {Map} Keyed by the value of the instance's keyColumn
     */
    static instances = null;  

    /**
     * Holds all of the column names that are mapped to the database table
     * for this class.
     * @constant columns overridden by each subclass
     * @type {Array} Each array element is a string column name.
     */
    static columns = []; 

    /**
     * Returns the name of the database table.
     * @returns {string}  The name of the database table, which defaults to the class name
     */
    static get tableName() {
        return this.name;
    }

    /**
     * Returns the name of the column that functions as the table's key.
     * @returns {String} The name of the key column, which defaults to the first column name
     */
    static get keyColumn() {
        return this.columns[0];
    }

    /**
     * Returns all of the instances of the class as loaded from the database.
     * Only loads from the database if not already loaded.
     * @returns {Map} All of the instances loaded from the databse, keyed by the 
     *                value of each instance's keyColumn.
     */
    static allInstances() {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        return this.instances;
    }

    /**
     * Load all of the instances from the database into the instances Map.
     * If the instances Map already contains an instance matching the value
     * of the database instance's keyColumn, do not overwrite it from the database.
     * After loading, set isLoaded to true.
     * @private
     */
    static loadFromDatabase() {
        var newInstances = Database.loadAllForClass(this);
        if (this.instances === null) {
            this.instances = newInstances;
        } else {
            for (var [key, value] of newInstances) {
                if (!this.instances.has(key)) {
                    this.instances.set(key, value);
                }
            }
        }

        this.isLoaded = true;    
    }

    /**
     * Create a function name from get + the columnName and return that function,
     * if it exists in the class' prototype.  This is used to access values of a
     * DatabaseTable subclass when all we know is the columnName.
     * Logs a message to the console if the function is not found in the prototype.
     * @todo throw an error instead of logging to the console
     * @param {String} columnName 
     * @returns {Function get+columnName() {}}
     * @private
     */
    static getterFunctionFor(columnName) {
        var getterName = 'get' + columnName;
        var getterFunction = this.prototype[getterName];
        if (getterFunction == undefined) {
            console.log("Getter function undefined for " + this.name + " function: " + getterName)

        }
        return getterFunction;
    }

    /**
     * Search through the instances loaded from the database (and/or created since loading)
     * to find all instances where the value of evaluating a getter function based on columnName
     * matches the value parameter.
     * Load all instances from the database first, if not already loaded.
     * @todo Figure out how to get a subset of instances from the database that match the search
     * criteria without overwriting any items already loaded.
     * @param {String} columnName 
     * @param {Object} value 
     * @returns {Array} of instances matching the value for that columnName.
     */
    static allWhere(columnName, value) {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        var answer = [];
        var getterFunction = this.getterFunctionFor(columnName);
        for (var instance of this.instances.values()) {
            if (value == getterFunction.call(instance)) {
                answer.push(instance);
            }
        }
        return answer;

    }

    /**
     * Answer a single instance of the class whose value at its keyColumn matches
     * value.  Since instances are stored in a Map keyed by keyColumn, this is a simple
     * get operation from that Map.
     * Load all instances from the database first, if not already loaded.
     * @todo Figure out how to get a single instance from the database into instances
     * without loading all of them, and without overwriting any matching object already
     * in the instances Map.
     * @param {Object} value the value to match to the loaded instance's keyColumn value
     * @returns {DatabaseTable} an instance of the subclass on which this method is called.
     */
    static whereKeyIs(value) {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        return this.instances.get(value);
    }

}