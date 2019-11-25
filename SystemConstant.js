class SystemConstant extends DatabaseTable {
    systemValueType = '';
    systemValue = undefined;

    static keyColumn = 'SystemValueType';
    static columns = [
        'SystemValueType', 
        'SystemValue', 
    ]; 
    static valueAt(typeName) {
        console.log(this.instances.get(typeName));
        return this.instances.get(typeName).systemValue;
    }
    setSystemValueType(aString) {
        this.systemValueType = aString;
    }

    setSystemValue(anObject) {
        this.systemValue = anObject;
    }

}