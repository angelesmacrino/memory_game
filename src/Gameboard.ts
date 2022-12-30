import {Tile} from './Tile'
import { Chronometer } from './Chronometer'
import { ScoreBoard } from './ScoreBoard'
import { Options } from './Options'

export class GameBoard {
    private _tiles: string[] = []
    private _gameBoard:Array<Tile> = []
    private selectedTile:Tile | null = null
    private chronometer: Chronometer | null = null
    private scoreBoard: ScoreBoard | null = null
    private options: Options | null = null
  
    public storeChronometerAndScoreBoard(chronometer: Chronometer, scoreBoard: ScoreBoard) {
      this.chronometer = chronometer
      this.scoreBoard = scoreBoard
    }
    private setOptions(options: Options) {
      this.options = options
    }
    public populateGameBoard(options: Options) {
      this.setOptions(options)
      this.setAmountOfTiles(options.getNumberOfPairs())
      this.gameBoardConstructor()
      const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
      this._gameBoard.forEach((tile)=> {
        const tileImg = tile.createTileImage()
        const cardDiv = tile.createTileCard(undefined, (tile: Tile) => () => this.onTileClick(tile))
        cardDiv.appendChild(tileImg)
        gameBoardHtml.appendChild(cardDiv)
      })
    }
    
    private setAmountOfTiles(amount: number) {
      for (let i = 0; i < amount; i++) {
        this._tiles.push(`${i}`)
      }
    }

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
      return new Tile(tileName, this.options)
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
    

    public onTileClick(tile:Tile) {
      if (tile.isNotSolved()) {
        this.selectOrCompareTile(tile)
      }
    }
    private selectOrCompareTile (tile:Tile) {
      if (this.notATileSelected()) {
        this.selectedTile = tile
        tile.flip()
      } else {
        this.whenClickingASecondTime(tile)
      }
    }
    private notATileSelected() {
      return this.selectedTile === null
    }
    private whenClickingASecondTime(tile:Tile) {
      if (this.sameTileClicked(tile)) {
        tile.flip()
        this.eraseSelectedTile()
      } else {
        this.differentTileClicked(tile)
      }
    }
  
    private differentTileClicked(tile:Tile) {
      tile.flip()
      this.setPointerEventsToNone();
      if (this.thereIsNotAMatch(tile)) {
        this.setTimeOutForBothTiles(tile, false)
      } else if (this.selectedTile && tile.isAMatch(this.selectedTile)) {
        this.setTimeOutForBothTiles(tile, true);
      }
    }
  
    private setPointerEventsToNone() {
      const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
      gameBoardHtml.style.pointerEvents = 'none';
    }
  
    private sameTileClicked(tile:Tile) { // Ask tile if it is shown instead
      return this.selectedTile?.id === tile.id
    }
    private eraseSelectedTile() {
      this.selectedTile = null
    }
    private thereIsNotAMatch(tile:Tile) {
      return this.selectedTile?.name !== tile.name
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
        return tile.isSolved
      })
    }
    private checkForWin() {
      if (this.allTtilesGotSolved()) {
        this.finishGame()
      }
    }
    private finishGame() {
      const score = this.chronometer?.getTimeValue() || '00:00:00'
      const player = prompt('You won!, enter your name: ')
      if (player) {
        this.scoreBoard?.addScore(score, player)
      }
      this.chronometer?.stop();
      this.toggleDivVisibility('chrono');
      this.deleteGameBoard();
      this.toggleDivVisibility('startGameButton');
      this.toggleDivVisibility('optionsButton');
    }

    private toggleDivVisibility (divId: string) {
      const div = document.getElementById(divId)
      div?.classList.toggle('hidden')
    }
    public deleteGameBoard () {
      this._gameBoard = []
      this._tiles = []

      const gameBoardHtml = document.getElementById('gameBoard')  as HTMLElement;
      var child = gameBoardHtml.lastElementChild; 
          while (child) {
            gameBoardHtml.removeChild(child);
            child = gameBoardHtml.lastElementChild;
          }
        }
  }
 