class Transition extends DatabaseTable {
    startPathString = '';
    startPath = [];
    endState = '';

    static columns = [
        'StartPath', 
        'EndState'
    ]; 
    
    setStartPath(aString) {
        this.startPathString = aString;
        var parts = aString.split('-');
        var actionName = parts.pop();
        var startStateName = parts.pop();
        var startState = State.whereKeyIs(startStateName);
        var action = Action.whereKeyIs(actionName);
        this.startPath = [startState, action];
    }
    setEndState(endStateName) {
        this.endState = State.whereKeyIs(endStateName);
    }
}