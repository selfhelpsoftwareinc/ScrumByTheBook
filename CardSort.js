class CardSort extends DatabaseTable {
    name = '';
    isTransition = false;
    transition = undefined;
    transitionStartStateName = undefined;
    transitionActionName = undefined;


    static keyColumn = 'Name';
    static columns = [
        'Name', 
        'IsTransition', 
        'TransitionStartStateName', 
        'TransitionActionName'
    ]; 

    setName(aString) {
        this.name = aString;
    }
    setIsTransition(aBoolean) {
        this.isTransition = aBoolean;
    }
    setTransitionStartStateName(aString) {
        this.transitionStartStateName = aString;
        if (this.transitionActionName != undefined) {
            this.setTransition();
        }
    }
    setTransitionActionName(aString) {
        this.transitionActionName = aString;
        if (this.transitionStartStateName != undefined) {
            this.setTransition();
        }
    }
    setTransition() {
        var allTransitions = Transition.allInstances();
        var key = this.transitionStartStateName + '-' + this.transitionActionName;
        var value = allTransitions.get(key);
        this.transition = value;
    }
}