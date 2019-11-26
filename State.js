class State extends DatabaseTable {
    name = '';
    color = undefined;
    include = true;
    includeInPipeline = false;
    includeInVelocity = false;

    static columns = [
        'Name', 
        'Color', 
        'Include',
        'IncludeInPipeline', 
        'IncludeInVelocity'
    ];

    setName(aString) {
        this.name = aString;
    }

    setColor(anObject) {
        this.color = anObject;
    }

    setInclude(aBoolean) {
        this.include = aBoolean;
    }

    setIncludeInPipeline(aBoolean) {
        this.includeInPipeline = aBoolean;
    }

    setIncludeInVelocity(aBoolean) {
        this.includeInVelocity = aBoolean;
    }

}