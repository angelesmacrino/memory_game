import './style.css'

import { Chronometer } from './Chronometer'
import { ScoreBoard } from './ScoreBoard'
import { GameBoard } from './Gameboard'
import { Options } from './Options'

class Main {
  private gameBoard : GameBoard;
  private chronometer : Chronometer;
  private scoreBoard : ScoreBoard;
  private options : Options;

  constructor () {
    this.gameBoard = new GameBoard();
    this.chronometer = new Chronometer('chrono');
    this.scoreBoard = new ScoreBoard();
    this.options = new Options(10, 'back1', 'fruits');
  }
  
  public init (): void {
    this.gameSetup()
  }

  private gameSetup () {
    this.addEventListenerToButton('startGameButton', () => this.startGame());
    this.addEventListenerToButton('scoresButton', () => this.toggleScoreBoard());
    this.addEventListenerToButton('optionsButton', ()=> this.visualizeChosenOptionsAndToggleScoreboard());
    this.addEventListenerToForm('optionsForm', (e:Event) => this.applyOptionsChanges(e));
  }
  private applyOptionsChanges(e:Event) {
    e.preventDefault()
    this.options.changeOptions(this.getFormData(e.target));
    this.toggleOptionsMenu();
  }
  private getFormData (form:any) {
    return new FormData(form);  
  }
  private addEventListenerToButton (id:string, func: EventListenerOrEventListenerObject) {
    const button = document.getElementById(id);
     if (button){
       button.addEventListener('click', func);
     }
   }
private addEventListenerToForm (id:string, func: EventListenerOrEventListenerObject) {
    const form = document.getElementById(id);
     if (form){
       form.addEventListener('submit', func);
       form.addEventListener('reset', (e)=> {
        e.preventDefault();
        this.toggleOptionsMenu();
       });
     }
}
   private startGame() {
    this.gameBoard.storeChronometerAndScoreBoard(this.chronometer, this.scoreBoard);
    this.toggleDivVisibility('startGameButton');
    const optionsMenu = document.getElementById('optionsMenu');
    if (!optionsMenu?.classList.contains('hidden')) {
      this.toggleDivVisibility('optionsMenu');

    }
    this.gameBoard.populateGameBoard(this.options);
    this.chronoSetup('chrono');
    this.toggleDivVisibility('optionsButton');
  }

  private toggleDivVisibility (divId: string) {
    const div = document.getElementById(divId)
    div?.classList.toggle('hidden')
  }

  private chronoSetup(chronoId: string) {
    this.toggleDivVisibility(chronoId);
    this.chronometer.start();
  }
private visualizeChosenOptionsAndToggleScoreboard () {
  const possibleRadioOptionsId = ['5pairs', '10pairs', '15pairs'];
  const possibleCardBacksId = ['back1', 'back2', 'back3'];
  const possibleCardThemesId = ['fruits', 'letters'];
  this.assignOptionChecked(possibleRadioOptionsId, this.options.getNumberOfPairs());
  this.assignOptionChecked(possibleCardBacksId, this.options.getBackStyle());
  this.assignOptionChecked(possibleCardThemesId, this.options.getCardTheme());
  this.toggleOptionsMenu();
}
private assignOptionChecked (array: string[], func: String | number) {
  console.log(func)
  array.forEach((id) => {
      const option = <HTMLInputElement>document.getElementById(id);
      if (option) {
        if (option.value === func) {
          option.checked = true;
        }
      }
  })
}

  private toggleScoreBoard () {
    const scoreBoard = document.getElementById('scoreBoard');
    if (scoreBoard){
      scoreBoard.classList.toggle('hidden')
    }
  }
  
  private toggleOptionsMenu () {
    const optionsMenu = document.getElementById('optionsMenu');
    if (optionsMenu){
      optionsMenu.classList.toggle('hidden')
    }
  }
}

let game = new Main()
game.init()



