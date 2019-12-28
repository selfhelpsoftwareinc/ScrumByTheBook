/**
 * A CardCell defines one segment of how a component of a BacklogItem
 * is displayed in Card View.  Its location (lineNumber x cellNumber)
 * is unique, and together make up its database key.
 * Together, all of the CardCells make up the CardLayout, specifying
 * how an entire card is layed out, in lines and cells.
 */

class CardCell extends DatabaseTable {

    /**
     * @type {String} the unique database key that gives the relative
     * location of this cell to all other cells in the format of
     * '<lineNumber>-<cellNumber>'  Upon reading from the database,
     * this will be broken up into its separate components (line number
     * and cell number).
     */
    lineCellNumbers = '';

    /**
     * @type {String} the property of a BacklogItem that will be
     * displayed in this cell.
     */
    name = '';

    /**
     * @type {Number} the line (0-relative, counting from the top)
     * on which this cell is displayed
     */
    lineNumber = undefined;

    /**
     * @type {Number} the cell (0-relative, counting from the left)
     * in which this cell is displayed
     */
    cellNumber = undefined;

    /**
     * @type {Array of Array of CardCells} The outer array denotes the lines;
     * the inner array denotes the cells in each line.
     */
    static layoutLines = [];

    /**
     * @type {Array of Strings} As required for all subclasses of DatabaseTable,
     * an Array all the column name strings stored in the databse for this class.
     */
    static columns = [
        'Numbers', 
        'Name'
    ];     

    /**
     * @override Load the CardCells from the database, and also set up
     * the collection of layoutLines to organize the cells by their relative
     * locations in the grid.
     */
    static loadFromDatabase() {
        super.loadFromDatabase();
        this.setUpLayoutLines();
    }

    /**
     * Populate the static variable, layoutLines, with the cells
     * at each location.
     */
    static setUpLayoutLines() {
        for (var [eachLineCardNumber, eachCardCell] of this.instances) {
            var cards = [];
            if (this.layoutLines[eachCardCell.lineNumber] != undefined) {
                cards = this.layoutLines[eachCardCell.lineNumber];
            }
            cards[eachCardCell.cellNumber] = eachCardCell;
            this.layoutLines[eachCardCell.lineNumber] = cards;
        }
    }

    /**
     * Answer the layout of all of the stored CardCells, arranged
     * by line and cell, in top-to-bottom, left-to-right order.
     * @return {Array of Array of CardCells}
     */
    static getLayoutLines() {
        return this.layoutLines;
    }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the lineCellNumbers instance variable from the 
     * receiver's Numbers column in the database.
     * Also parse the Numbers String into its constituent lineNumber and
     * cellNumber components.
     * @param {String} aString The unique identifier for this CardCell
     */
    setNumbers(aString) {
        this.lineCellNumbers = aString;
        var parts = this.lineCellNumbers.split('-');
        this.cellNumber = parseInt(parts.pop());  // cellNumber is last
        this.lineNumber = parseInt(parts.pop()); // lineNumber is first
   }

    /**
     * As required for all subclasses of DatabaseTable, a setter function 
     * corresponding to a column name. 
     * In this case, set the name instance variable from the receiver's 
     * Name column in the database.
    * @param {String} aString 
    */
    setName(aString) {
        this.name = aString;
    }
}