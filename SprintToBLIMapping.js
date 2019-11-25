class SprintToBLIMapping extends DatabaseTable {
    sprintToBLIMappingID = undefined;
    sprintID = undefined;
    backlogItemID = undefined;

    static keyColumn = 'SprintToBLIMappingID';
    static columns = [
        'SprintToBLIMappingID',
        'SprintID', 
        'BacklogItemID', 
    ];

    static sprintToBLIMap = new Map();
    static bliToSprintMap = new Map();

    static loadFromDatabase() {
        super.loadFromDatabase();
        this.buildMaps();
    }

    static buildMaps() {
        for (var [eachMappingID, eachMapping] of this.instances) {
            var eachSprintID = eachMapping.sprintID;
            var eachBacklogItemID = eachMapping.backlogItemID;
            
            var backlogItems = this.sprintToBLIMap.get(eachSprintID);
            if (backlogItems == undefined) {
                backlogItems = [];
            }
            backlogItems.push(eachBacklogItemID);
            this.sprintToBLIMap.set(eachSprintID, backlogItems);

            var sprintItems = this.bliToSprintMap.get(eachBacklogItemID);
            if (sprintItems == undefined) {
                sprintItems = [];
            }
            sprintItems.push(eachSprintID);
            this.bliToSprintMap.set(eachBacklogItemID, sprintItems);
        }
        console.log("sprintToBLIMap...");
        console.log(this.sprintToBLIMap);
        console.log("bliToSprintMap...");
        console.log(this.bliToSprintMap);
    }

    static getBLIsFor(sprintID) {
        if(!this.isLoaded) {
            this.loadFromDatabase();
        }
        var bliIDs = this.sprintToBLIMap.get(sprintID);
        var answer = [];
        for (var bliID of bliIDs) {
            
        }
        return BacklogItem.allWhere('BacklogItemID', )
    }

    setSprintToBLIMappingID(aNumber) {
        this.sprintToBLIMappingID = aNumber;
    }

    setSprintID(aNumber) {
        this.sprintID = aNumber;
    }

    setBacklogItemID(aNumber) {
        this.backlogItemID = aNumber;
    }

}