class BLIChangeHistory {
    changes = [];
    points = 0;

    static historyFor(aBacklogItem, bliPointsNumber) {
        var answer = new BLIChangeHistory();
        answer.changes = BLIChange.allWhere('BacklogItemID', aBacklogItem.id);
        answer.points = bliPointsNumber;
        return answer;
    }

    // set changes(aCollectionOfBLIChanges) {
    //     this.changes = aCollectionOfBLIChanges;
    // }

    // set points(aNumber) {
    //     this.points = aNumber;
    // }
}