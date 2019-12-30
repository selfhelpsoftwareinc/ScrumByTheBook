/**
 * The DateRange class represents a span of Dates between (and including)
 * a startDate and an endDate.
 */
class DateRange {

    /**
     * @type {Date} The beginning of the range.
     */
    startDate = undefined;

    /**
     * @type {Date} The end of the range.
     */
    endDate = undefined;

    /**
     * Create a new instance of the receiver with the startDate and endDate set.
     * @param {Date} theStartDate 
     * @param {Date} theEndDate 
     */
    constructor(theStartDate, theEndDate) {
        this.startDate = theStartDate;
        this.endDate = theEndDate;
    }

    /**
     * Answer whether or not a date falls within the receiver's range
     * @param {Date} aDate 
     * @returns {Boolean} whether aDate falls within the range
     */
    includes(aDate) {
        return (startDate <= aDate) &&
                (aDate <= endDate)
    }

}