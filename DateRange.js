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

    /**
     * Answer whether the date range completely encloses another
     * date range.  Any of following will return true:
     *   receiver:  |start|-----------------------|end|
     *   parameter:       |start|-----------|end|
     * 
     *   receiver:  |start|-----------------------|end|
     *   parameter: |start|-----------|end|
     * 
     *   receiver:  |start|-----------------------|end|
     *   parameter:             |start|-----------|end|
     * 
     *   receiver:  |start|-----------------------|end|
     *   parameter: |start|-----------------------|end|
     * 
     * @param {DateRange} aDateRange
     * @returns {Boolean} whether the parameter is completely within
     * the receiver
     */
    encompasses(aDateRange) {
        return (this.startDate <= aDateRange.startDate) &&
        (aDateRange.endDate <= this.endDate);
    }

    /**
     * Answer whether there is any overlap of dates between
     * the receiver and the parameter date ranges.
     * In addition to the edge cases (see DateRange.encompasses()),
     * Any of the following will return true:
     *   receiver:  |start|-----------------------|end|
     *   parameter:       |start|-----------|end|
     * 
     *   receiver:         |start|-----------|end|
     *   parameter: |start|-----------------------|end|
     * 
     *   receiver:  |start|----------------|end|
     *   parameter:        |start|----------------|end|
     * 
     *   receiver:         |start|----------------|end|
     *   parameter: |start|----------------|end|
     * 
     * 
     * @param {DateRange} aDateRange 
     * @returns {Boolean} whether any of the dates within
     * the receiver overlap with any of the dates within the parameter
     */
    overlaps(aDateRange) {
        return (this.encompasses(aDateRange)) ||
            (aDateRange.encompasses(this)) ||
            (this.startDate <= aDateRange.startDate && this.endDate <= aDateRange.endDate) ||
            (aDateRange.startDate <= this.startDate && aDateRange.endDate <= this.endDate)

    }
}