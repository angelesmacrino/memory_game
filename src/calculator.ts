import {ButtonCreator} from './buttons'


export class Calculator {
    private EMPTY_CALCULATOR_INPUT = ''
    // private OPERATORS_REGEX = /([\+\-x%])/;
    private calculationVisor: HTMLInputElement;
    // private result: any[];
    
    constructor() {
        // this.result = [];
        this.calculationVisor = document.getElementById("calculationVisor") as HTMLInputElement;
        this.calculationVisor.value = this.EMPTY_CALCULATOR_INPUT ?? ''
        this.buildCalculatorButtons()
    }

   private buildCalculatorButtons() :void {
        this.buildNumberAndOperatorButtons();
        this.buildDeleteButton();
        this.buildDeleteAllButton();
    };
   private buildNumberAndOperatorButtons(): void {
        const numberButtons = ButtonCreator.createButton("numberButtons");
        const operatorButtons = ButtonCreator.createButton("operatorButtons");
        this.appendEventListenersToMultipleButtons(numberButtons);
        this.appendEventListenersToMultipleButtons(operatorButtons);
    };

   private appendEventListenersToMultipleButtons(buttonsType: any): void {
        buttonsType.buttons?.forEach((button: HTMLElement) => {
            button.addEventListener('click', ()=> {
                this.calculationVisor.value += button.textContent ?? ""
            })
            document.addEventListener('keydown', (event) => {
                if(event.key === button.textContent) {
                    this.calculationVisor.value += button.textContent ?? ""
                }
            })
        }) 
    }

   private buildDeleteButton(): void {
        const deleteButton = ButtonCreator.createButton("deleteButton");
        deleteButton.button?.addEventListener('click', ()=> {
            this.calculationVisor.value = this.calculationVisor.value.slice(0, -1)
        })
    }

   private buildDeleteAllButton(): void {
        const deleteButton = ButtonCreator.createButton("deleteAllButton");
        deleteButton.button?.addEventListener('click', ()=> {
            this.calculationVisor.value = this.EMPTY_CALCULATOR_INPUT
        })
    }
    
    // public changeInput(type:string): void {
    //     switch(type) {
    //         case "deleteAll":
    //             this.changeToDeleteAllInput();
    //             break;
    //         case "delete":
    //             this.changeToDeleteInput();
    //             break;
    //         case "result":
    //             this.result = this.numberVisor.value.split(this.OPERATORS_REGEX);
    //             this.getResultFromCalculation();
    //             break;
    //         default:
    //             this.addNumberToCalculation(type);
                       
    //     }
    // }

    // private changeToDeleteAllInput(): void {
    //     this.numberVisor.value = this.EMPTY_CALCULATOR_INPUT    
    // }

    // private changeToDeleteInput(): void {
    //     if (!this.calculatorHasNoInput()) {
    //         this.removeLastCharacterFromInput();
    //     }
    //     if (this.numberVisor.value.length === 0) {
    //         this.numberVisor.value = this.EMPTY_CALCULATOR_INPUT
    //     }
    // }

    //     private addNumberToCalculation(number:string):void {
    //         if (this.calculatorHasNoInput() && this.buttonIsNotAnOperator(number)) {
    //             this.numberVisor.value = number
    //         } else {
    //             this.numberVisor.value +=  number
    //         }
    //     }

    //     private buttonIsNotAnOperator(number:string):boolean {
    //         return !['+', '-', 'x', '%'].includes(number);
    //     }

    //         private getResultFromCalculation():void {
    //             for (let position = 0; position < this.result.length; position++) {
    //                 if (this.termIsOperator(this.result[position])) {
    //                     this.applyOperator(position)
    //                 }
    //             }
    //             this.numberVisor.value = this.result[this.result.length - 1]
    //         }
    //             private termIsOperator(term:string):boolean {
    //                 return this.OPERATORS_REGEX.test(term)
    //             }
    //             private applyOperator(position:number):void {
    //                 const PREVIOUS_TERM = position - 1
    //                 const NEXT_TERM = position + 1
    //                 if (this.result[position] === '+') {
    //                     this.result[NEXT_TERM] = Number(this.result[PREVIOUS_TERM]) + Number(this.result[NEXT_TERM])
    //                 }
    //                 if (this.result[position] === '-') {
    //                     this.result[NEXT_TERM] = Number(this.result[PREVIOUS_TERM]) - Number(this.result[NEXT_TERM])
    //                 }
    //                 if (this.result[position] === 'x') {
    //                     this.result[NEXT_TERM] = Number(this.result[PREVIOUS_TERM]) * Number(this.result[NEXT_TERM])
    //                 }
    //                 if (this.result[position] === '%') {
    //                     if (Number(this.result[NEXT_TERM]) === 0) {
    //                         this.result[NEXT_TERM] = 'MATH ERROR'
    //                     } else {
    //                         this.result[NEXT_TERM] = Number(this.result[PREVIOUS_TERM]) / Number(this.result[NEXT_TERM])
    //                     }
    //                 }
    //             }
    //         private calculatorHasNoInput(): boolean {
    //             return this.numberVisor.value === this.EMPTY_CALCULATOR_INPUT
    //         }
    //         private removeLastCharacterFromInput():void {
    //             this.numberVisor.value = this.numberVisor.value.slice(0, -1)
    //         }
    // public get getActualValueFromCalculator():string {
    //     return this.numberVisor.value
    // }
}
