import './style.css'
import {ButtonCreator} from './buttons'
import {Calculator} from './calculator'


class Program {

  calculator: Calculator
  
  constructor() {
    this.calculator = new Calculator()
  }

}


window.addEventListener('DOMContentLoaded', ()=>{
  let start = new Program()
})