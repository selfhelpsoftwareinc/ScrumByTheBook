BLIChange = require("./BLIChange.js").BLIChange;
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
}
module.exports = {BLIChangeHistory}