class Database {
    static loadAllForClass(aClass) {
        var map = new Map();
        var records = this.allRecordsFrom(aClass.getTableName());
        for (var eachRecord of records) {
            var instance = this.instantiateFrom(aClass, eachRecord);
            var keyColumn = aClass.keyColumn;
            map.set(eachRecord.at(keyColumn), instance);
        }
        return map;
    }

    static loadAllForClassWhere(aClass, aColumnName, aValue) {
        // This will be done with a SQL Where statement ultimately.
        var map = new Map();
        var records = this.allRecordsWhere(aClass.getTableName(), aColumnName, aValue);
        for (var eachRecord of records) {
            var instance = this.instantiateFrom(aClass, eachRecord);
            var keyColumn = aClass.getKeyColumn();
            map.set(eachRecord.at(keyColumn), instance);
        }
        return map;

    }

    static allRecordsFrom(tableName) {
        var answer = Record.recordsFor(tableName);
        return answer;
    }
    static allRecordsWhere(tableName, aColumnName, aValue) {
        // This will be done with a SQL WHERE clause eventually
        var answer = Record.recordsWhere(tableName, aColumnName, aValue);
        return answer;
    }

    static instantiateFrom(aClass, aRecord) {
        var instance = new aClass();
        var columns = aClass.columns;
        for (var eachColumnName of columns) {
            var value = aRecord.at(eachColumnName);
            var setterFunctionName = "set" + eachColumnName;
            var setterFunction = aClass.prototype[setterFunctionName];
            if (setterFunction == undefined) {
                console.log("For class: " + aClass.name, " Undefined setter function: " + setterFunctionName);
            } else {
                setterFunction.call(instance, value);
            }
        }
        return instance;
    }
}