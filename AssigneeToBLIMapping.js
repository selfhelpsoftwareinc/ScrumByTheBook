class AssigneeToBLIMapping extends DatabaseTable {
    assigneeToBLIMappingID = undefined;
    assigneeID = undefined;
    backlogItemID = undefined;

    static columns = [
        'AssigneeToBLIMappingID',
        'AssigneeID', 
        'BacklogItemID', 
    ];

    static assigneeToBLIMap = new Map();
    static bliToAssigneeMap = new Map();

    static loadFromDatabase() {
        super.loadFromDatabase();
        this.buildMaps();
    }

    static buildMaps() {
        for (var [eachMappingID, eachMapping] of this.instances) {
            var eachAssigneeID = eachMapping.assigneeID;            
            var eachBacklogItemID = eachMapping.backlogItemID;

            var backlogItems = [];
            if (this.assigneeToBLIMap.has(eachAssigneeID)) {
                backlogItems = this.assigneeToBLIMap.get(eachAssigneeID);
            } 
            
            backlogItems.push(eachBacklogItemID);
            this.assigneeToBLIMap.set(eachAssigneeID, backlogItems);

            var assigneeItems = this.bliToAssigneeMap.get(eachBacklogItemID);
            if (assigneeItems == undefined) {
                assigneeItems = [];
            }
            assigneeItems.push(eachAssigneeID);
            this.bliToAssigneeMap.set(eachBacklogItemID, assigneeItems);
        }
        console.log("assigneeToBLIMap...");
        console.log(this.assigneeToBLIMap);
        console.log("bliToAssigneeMap...");
        console.log(this.bliToAssigneeMap);
    }

    static getBLIsFor(assigneeID) {
        if(!this.isLoaded) {
            this.loadFromDatabase();
        }
        var bliIDs = this.assigneeToBLIMap.get(assigneeID);
        var answer = [];
        for (var bliID of bliIDs) {
            answer.push(BacklogItem.whereKeyIs(bliID));
        }
        return answer;
    }

    static getAssigneesFor(backlogItemID) {
        if (!this.isLoaded) {
            this.loadFromDatabase();
        }
        var assigneeIDs = this.bliToAssigneeMap.get(backlogItemID);
        var answer = [];
        for (var assigneeID of assigneeIDs) {
            answer.push(Assignee.whereKeyIs(assigneeID));
        }
        return answer;
    }

    setAssigneeToBLIMappingID(aNumber) {
        this.assigneeToBLIMappingID = aNumber;
    }

    setAssigneeID(aNumber) {
        this.assigneeID = aNumber;
    }

    setBacklogItemID(aNumber) {
        this.backlogItemID = aNumber;
    }

}