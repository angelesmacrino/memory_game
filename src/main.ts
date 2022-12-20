import './style.css'
var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}
export class Tile {
  letter:string
  shown:boolean
  solved:boolean
  id:string
  tileImage: HTMLImageElement | null
  constructor(letter: string) {
    this.letter = letter
    this.shown = false
    this.solved = false
    this.tileImage = null
    this.id = s4()
  }
  public getTileName() {
    return this.letter
  }
  public getTileSolved() {
    return this.solved
  }
  public getTileID () {
    return this.id
  }
  public createTileImage (id=this.id): HTMLImageElement {
    this.tileImage = document.createElement('img')
    this.tileImage.src = `./src/tileSprites/back.png`
    this.tileImage.setAttribute('id', `${id}`)
    return this.tileImage
  }

  public createTileCard (id=this.id, gameBoard:GameBoard): HTMLDivElement {
    const tileCard = document.createElement('div')
    tileCard.classList.add('boardCard')
    tileCard.setAttribute('id', `tile ${id}`)
    tileCard.addEventListener('click', () => {
      gameBoard.onTileClick(this)
    })
    return tileCard
  }
  public isNotSolved () {
    return !this.getTileSolved()
  }
  public flip () {
    if (this.tileImage?.getAttribute('src') === `./src/tileSprites/back.png`) {
      this.tileImage.src = `./src/tileSprites/${this.letter}.png`
    } else if (this.tileImage?.getAttribute('src') === `./src/tileSprites/${this.letter}.png`) {
      this.tileImage.src = `./src/tileSprites/back.png`
    }
  }

  public setSolved () {
    this.solved = true
    if (this.tileImage) {
      this.tileImage.src = `./src/tileSprites/solved.png`
    }
  }

}

export class GameBoard {
  private _tiles = ['a', 'b', 'c', 'd', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p']
  private _gameBoard:Array<Tile> = []
  private selectedTile:Tile | null = null

  public gameBoardConstructor() {
    const tiles = this.generateTiles(this._tiles)
    this.setGameBoard(this.generateGameBoard(tiles))
  }
  private generateTiles(tiles: string[]): Tile[] {
    return tiles.map((tileName)=>{
      return this.generateNewTile(tileName)
    })
  }
  private generateNewTile(tileName:string): Tile {
    return new Tile(tileName)
  }
  private generateGameBoard(tiles: Array<Tile>):Array<Tile> {
    let concatenatedTiles = this.appendTiles(tiles)
    return this.shuffleTiles(concatenatedTiles)
  }
  private appendTiles(tiles: Array<Tile>) {
    return [...tiles].concat([...this.generateTiles(this._tiles)])
  }
  private shuffleTiles(tiles: Array<Tile>) {
    //function by superluminary on stack overflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let shuffled = tiles
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return shuffled
  }

  public getGameBoard() {
    return this._gameBoard
  }
  public setGameBoard(gameBoard: Array<Tile>) {
    this._gameBoard = gameBoard;
  }
  public populateGameBoard() {
    this.gameBoardConstructor()
    const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
    this._gameBoard.forEach((tile)=> {
      const tileImg = tile.createTileImage()
      const cardDiv = tile.createTileCard(undefined, this)
      cardDiv.appendChild(tileImg)
      gameBoardHtml.appendChild(cardDiv)
    })
  }
  public onTileClick(tile:Tile) {
    if (tile.isNotSolved()) {
      this.twoTilesComparing(tile)
    }
  }
  private twoTilesComparing (tile:Tile) {
    if (this.notATileSelected()) {
      this.selectedTile = tile
      tile.flip()
    } else {
      this.whenClickingSecondTile(tile)
    }
  }
  private notATileSelected() {
    return this.selectedTile === null
  }
  private whenClickingSecondTile(tile:Tile) {
    if (this.sameTileClicked(tile)) {
      tile.flip()
      this.eraseSelectedTile()
    } else if (this.thereIsNotAMatch(tile)) {
        tile.flip()
        const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
        gameBoardHtml.style.pointerEvents = 'none';
        this.setTimeOutForBothTiles(tile, false)
    } else if (this.isAMatch(tile)) {
      tile.flip()
      const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
      gameBoardHtml.style.pointerEvents = 'none';
      this.setTimeOutForBothTiles(tile, true);
    }
  }
  private isAMatch(tile:Tile) {
    return (this.selectedTile?.getTileName() === tile.getTileName() && this.selectedTile?.getTileID() !== tile.getTileID())
  }
  private sameTileClicked(tile:Tile) {
    return this.selectedTile?.getTileID() === tile.getTileID()
  }
  private eraseSelectedTile() {
    this.selectedTile = null
  }
  private thereIsNotAMatch(tile:Tile) {
    return this.selectedTile?.getTileName() !== tile.getTileName()
  }
  private setTimeOutForBothTiles (tile:Tile, isSolved:boolean) {
    const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
    setTimeout(()=> {
      tile.flip()
      this.selectedTile?.flip()
      if (isSolved) {
        tile.setSolved()
        this.selectedTile?.setSolved()
      }
      this.eraseSelectedTile()
      gameBoardHtml.style.pointerEvents = 'auto';
      if (isSolved){
        this.checkForWin()
      }
    }, 1000);
  }
  private allTtilesGotSolved() {
    return this._gameBoard.every((tile)=> {
      return tile.getTileSolved()
    })
  }
  private checkForWin() {
    if (this.allTtilesGotSolved()) {
      finishGame()
    }
  }
  public deleteGameBoard () {
    this._gameBoard = []
    const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
    var child = gameBoardHtml.lastElementChild; 
        while (child) {
          gameBoardHtml.removeChild(child);
          child = gameBoardHtml.lastElementChild;
        }
      }
}

export class Chronometer {
  private _hours: number
  private _minutes: number
  private _seconds: number
  private chronoHTML: HTMLElement
  private interval:any
  constructor(chronoId: string) {
    this._hours = 0;
    this._minutes = 0;
    this._seconds = 0;
    this.chronoHTML = document.getElementById(chronoId) as HTMLElement;
  }
  public start () {
    this.interval = setInterval(() => {
      this.runChronometer()
    }, 1000)
  }

  private restartTime () {
    this._hours = 0;
    this._minutes = 0;
    this._seconds = 0;
    this.chronoHTML.textContent=this.setTimeToHTML('0', '0', '0')
  }
  private runChronometer (s=this._seconds, m=this._minutes, h=this._hours): void {
    let time: [number, number, number]
    time = this.setSecondsMinutesHours(s, m, h)
    this._seconds = time[0];
    this._minutes = time[1];
    this._hours = time[2];
    this.chronoHTML.textContent = this.setTimeToHTML(time[0].toString(), time[1].toString() , time[2].toString())
  } 
  private setSecondsMinutesHours (seconds: number, minutes: number, hours: number) {
    seconds += 1
    if (seconds > 59) {
      seconds = 0
      minutes += 1
    }
    if (minutes > 59) {
      minutes = 0
      hours += 1
    }
    let time: [number, number, number]
    time = [seconds, minutes, hours]
    return time
  }
  private setTimeToHTML (s:string, m:string , h:string):string {
    if (Number(s) < 10) s = `0` + s
    if (Number(m) < 10) m = `0` + m
    if (Number(h) < 10) h = `0` + h
    return `${h}:${m}:${s}`
  }

  public stop () {
    clearInterval(this.interval)
    this.restartTime()
  }
  public getTimeValue() {
    return this.chronoHTML.innerHTML
  }
}

export type Score = {
  score: string,
  player: string|null
}
export class ScoreBoard {
  private _scoreBoard: Array<Score>
  private _scoreBoardHTML: HTMLElement
  constructor() {
    this._scoreBoard = []
    this._scoreBoardHTML = document.getElementById('scoreBoard') as HTMLElement;
  }
  public addScore (score:string, player:string|null) {
    let entry: Score
    entry = {score, player}
    this._scoreBoard.push(entry)
    this.updateScoreBoard()
  }
  private updateScoreBoard () {
    this._scoreBoardHTML.innerHTML = ''
    this._scoreBoard.forEach((score:Score) => {
      const li = document.createElement('li')
      li.innerHTML =  score.player + ' ' + score.score
      this._scoreBoardHTML.appendChild(li)
    })
  }
  // public getScoreBoard() {
  //   return this._scoreBoard
  // }
}

var gameBoard = new GameBoard();
var chronometer = new Chronometer('chrono');
var scoreBoard = new ScoreBoard();

window.addEventListener('DOMContentLoaded', ()=>{
  try {
    gameSetup()
  } catch(e) {
    console.log(e)
  }
})

function gameSetup () {
  generateButtons();
}

export function generateButtons() {
  const startButton = document.getElementById('startGameButton');
  if (startButton){
    startButton.addEventListener('click', startGame);
  }
  const scoresButton = document.getElementById('scoresButton');
  if (scoresButton){
    scoresButton.addEventListener('click', toggleScoreBoard);
  }
  const optionsButton = document.getElementById('optionsButton');
  if (optionsButton){
    optionsButton.addEventListener('click', toggleOptionsMenu);
  }
}
function toggleOptionsMenu () {
  const optionsMenu = document.getElementById('optionsMenu');
  if (optionsMenu){
    optionsMenu.classList.toggle('hidden')
  }
}
function toggleScoreBoard () {
  const scoreBoard = document.getElementById('scoreBoard');
  if (scoreBoard){
    scoreBoard.classList.toggle('hidden')
  }
}
function toggleOptionsButton () {
  const optionsButton = document.getElementById('optionsButton');
  if (optionsButton){
    optionsButton.classList.toggle('hidden')
  }
}
export function startGame() {
  toggleDivVisibility('startGameButton');
  gameboardSetup();
  chronoSetup('chrono');
  toggleOptionsButton();
}
export function gameboardSetup() {
  gameBoard.populateGameBoard();
}
export function chronoSetup(chronoId: string) {
  toggleDivVisibility(chronoId);
  chronometer.start();
}

export function toggleDivVisibility (divId: string) {
  const div = document.getElementById(divId)
  div?.classList.toggle('hidden')
}

function finishGame () {
  saveScore();
  chronometer.stop();
  toggleDivVisibility('chrono');
  gameBoard.deleteGameBoard();
  toggleDivVisibility('startGameButton');
  toggleOptionsButton();
}

function saveScore() {
  const score = chronometer.getTimeValue()
  const player = prompt('You won!, enter your name: ')
  scoreBoard.addScore(score, player)
}




