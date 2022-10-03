
export interface Button {
    button?: HTMLElement,
    buttons?: NodeList
}

class ConcreteButton implements Button {
    button = document.getElementById("") as HTMLElement;
    buttons = document.querySelectorAll("x")
}

export class NumberButtons extends ConcreteButton {
    constructor() {
        super()
        this.buttons = document.querySelectorAll(".numberButton");
    }
    // returnButtonContent():string{
    //     return this.button.innerHTML
    // }
}

class OperatorButtons extends ConcreteButton {
    constructor() {
        super()
        this.buttons = document.querySelectorAll(".operatorButton");
    }
}

class ResultButton extends ConcreteButton {
    constructor() {
        super()
        this.button = document.getElementById("resultButton") as HTMLElement;
    }
}

class DeleteButton extends ConcreteButton {
    constructor() {
        super()
        this.button = document.getElementById("deleteButton") as HTMLElement;
    }
}

class DeleteAllButton extends ConcreteButton {
    constructor() {
        super()
        this.button = document.getElementById("deleteAllButton") as HTMLElement;
    }
}

export class ButtonCreator {
    static createButton(type: string): Button {
        switch(type) {
            case("deleteAllButton"):
                return new DeleteAllButton()
            case("deleteButton"):
                return new DeleteButton()
            case("resultButton"):
                return new ResultButton()
            case("numberButtons"):
                return new NumberButtons()
            case("operatorButtons"):
                return new OperatorButtons()
            default:
                throw new Error("invalid button type")
        }   
    }
}
