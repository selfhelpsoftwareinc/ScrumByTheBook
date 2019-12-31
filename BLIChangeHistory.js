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
     * Answer whether or not the most recent state is past the "Doing" state;
     * i.e., if it is Done, Tested or Accepted.
     * @returns {Boolean}
     */
    isComplete() {
        var lastChange = this.lastChange();
        if (lastChange == null) {
            return false
        }
        return lastChange.isComplete();
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

    /**
     * Loop backwards through the changes to find the 'Done' state, then
     * answer whether we achieved that state during aDateRange.
     * @param {DateRange} aDateRange 
     * @returns {Boolean} whether we became complete during aDateRange
     */
    becameCompleteDuring(aDateRange) {
        for (var i = changes.length - 1; i >= 0; i--) {
            if (changes[i].becameDoneDuring(aDateRange)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Answer the number of points that were done during a time period 
     * (e.g., during a Sprint).  Only answer points if we achieved
     * the 'Done' state during the date range.
     * @param {DateRange} aDateRange 
     * @returns {Number} the number of points completed during the range.
     */
    pointsCompleteDuring(aDateRange) {
        if (!this.becameCompleteDuring(aDateRange)) {
            return 0;
        }
        return this.points;
    }

    /** 
     * Answer the number of points of this change history if the
     * last change should be included in velocity calculations; otherwise
     * answer zero.
     * @returns {Number} the number of points to be included in 
     * velocity calculations
     */
    velocityPoints() {
        if (this.lastChange().includeInVelocity) {
            return this.points;
        }
        return 0;
    }

    /** 
     * Answer the number of points of this change history if the
     * last change should be included in pipeline calculations; otherwise
     * answer zero.
     * @returns {Number} the number of points to be included in 
     * pipeline calculations
     */
    pipelinePoints() {
        if (this.lastChange().includeInPipeline) {
            return this.points;
        }
        return 0;
    }
}