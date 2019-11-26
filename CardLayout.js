class CardLayout extends DatabaseTable {
    lineCardNumbers = '';
    name = '';
    lineNumber = undefined;
    cardNumber = undefined;

    static lines = new Map();

    static columns = [
        'Numbers', 
        'Name'
    ];     

    static loadFromDatabase() {
        super.loadFromDatabase();
        this.setUpLines();
    }
    static setUpLines() {
        for (var [eachLineCardNumber, eachCardLayout] of this.instances) {
            var cards = new Map();
            if (this.lines.has(eachCardLayout.lineNumber)) {
                cards = this.lines.get(eachCardLayout.lineNumber);
            }
            cards.set(eachCardLayout.cardNumber, eachCardLayout);
            this.lines.set(eachCardLayout.lineNumber, cards);
        }
    }

    static getLines() {
        return this.lines;
    }

    setNumbers(aString) {
        this.lineCardNumbers = aString;
        var parts = this.lineCardNumbers.split('-');
        this.cardNumber = parts.pop();
        this.lineNumber = parts.pop();
    }

    setName(aString) {
        this.name = aString;
    }
}