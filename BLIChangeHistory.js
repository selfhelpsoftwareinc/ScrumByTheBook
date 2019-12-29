/**
 * The BLIChangeHistory holds a collection of BLIChanges for each 
 * BacklogItem. It also stores the number of points (estimated level
 * of effort) for a BacklogItem.
 */
class BLIChangeHistory {

    /**
     * @type {Array of BLIChanges} collects, in order of occurrance,
     * all of the changes for a given BacklogItem
     */
    changes = [];

    /** 
     * @type {Number} the estimated level of effort for the associated
     * BacklogItem.
     */
    points = 0;

    /**
     * Construct and answer an instance of BLIChangeHistory for a given
     * BacklogItem by collecting from the database all of the BLIChanges 
     * for that BacklogItem.
     * Also, store the points for the BacklogItem.
     * @param {BacklogItem} aBacklogItem 
     * @param {Number} bliPointsNumber 
     * @returns {BLIChangeHistory}
     */
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

    /**
     * Answer the most recent change, if there is one; otherwise answer null
     * @returns {BLIChange}
     */
    lastChange() {
        var numChanges = this.changes.size;
        if (numChanges = 0) {
            return null;
        }
        return (this.changes[numChanges - 1]);
    }

    /**
     * Answer the most recent state, if there are any changes; otherwise
     * answer null.
     * @returns {State}
     */
    lastState() {
        var lastChange = this.lastChange();
        if (lastChange == null) {
            return null
        }
        return lastChange.state;
    }

    /**
     * Answer whether or not the most recent state is past the "Doing" state;
     * i.e., if it is Done, Tested or Accepted.
     * @returns {Boolean}
     */
    isComplete() {
        var lastState = this.lastState();
        if (lastState == null) {
            return false;
        }
        return lastState.isComplete();
    }

    /**
     * Answer the number of points for this BLIChangeHistory if we are in
     * a complete state, else answer 0.
     */
    pointsComplete() {
        if (this.isComplete()) {
            return this.points;
        }
        return 0;
    }
}