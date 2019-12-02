class DatabaseTable {
    static isLoaded = false;
    static columnFunctionMappings;
    static instances = null;
    static tableName = this.name;
    static columns = [];

    static getTableName() {
        return this.name;
    }

    static getKeyColumn() {
        return this.columns[0];
    }

    static allInstances() {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        return this.instances;
    }
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
                console.log("Getter function undefined for " + this.name + " function: " + getterName)
            }
        }
        return Database.loadAllForClassWhere(this, columnName, value);
    }
    static whereKeyIs(value) {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        return this.instances.get(value);
    }

}