class DatabaseTable {
    static isLoaded = false;
    static columnFunctionMappings;
    static keyColumn = '';
    static instances = undefined;
    static tableName = this.name;

    static getTableName() {
        return this.name;
    }
    static allInstances() {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        return this.instances;
    }
    static loadFromDatabase() {
        this.instances = Database.loadAllForClass(this);
        this.isLoaded = true;
    }

    static allWhere(columnName, value) {
        if (this.isLoaded) {
            var getterName = 'get' + columnName;
            var answer = [];
            var getterFunction = this.prototype[getterName];
            if (getterFunction != undefined) {
                for (var instance of this.instances.values()) {
                    if (value == getterFunction.call(instance)) {
                        answer.push(instance);
                    }
                }
                return answer;
            } else {
                console.log("Getter function undefined for " + this.name + "function: " + getterName)
            }
        }
        return Database.loadAllForClassWhere(this, columnName, value);
    }
    static whereKeyIs(value) {
        if (this.isLoaded) {
            return instances.get(value);
        }
        return Database.loadAllForClassWhere(this, this.keyColumn, value).get(value);
    }
}