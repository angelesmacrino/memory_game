import { Options } from './Options'

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

export class Tile {
    letter:string
    shown:boolean
    solved:boolean
    _id:string
    tileImage: HTMLImageElement | null
    options: Options
    constructor(letter: string, options: Options) {
      this.letter = letter
      this.shown = false
      this.solved = false
      this.tileImage = null
      this._id = s4()
      this.options = options
    }
    
    get name() {
      return this.letter
    }
    
    get isSolved() {
      return this.solved
    }
  
    get id () {
      return this._id
    }
  
    public createTileImage (id=this._id): HTMLImageElement {
      this.tileImage = document.createElement('img')
      this.tileImage.src = `./src/card-backs/${this.options.getBackStyle()}.jpg`
      this.tileImage.setAttribute('id', `${id}`)
      return this.tileImage
    }
  
    public createTileCard (id=this._id, onClickTile: Function): HTMLDivElement {
      const tileCard = document.createElement('div')
      tileCard.classList.add('boardCard')
      tileCard.setAttribute('id', `tile ${id}`)
      tileCard.addEventListener('click', onClickTile(this))
      return tileCard
    }
  
    public isNotSolved () {
      return !this.isSolved
    }
    public flip () {
      if (this.solved || !this.tileImage) return;
      this.shown = !this.shown
      this.tileImage.src = 
        this.shown 
          ? `./src/tileSprites/${this.letter}.png`
          : `./src/card-backs/${this.options.getBackStyle()}.jpg`;
    }
  
    public setSolved () {
      this.solved = true
      if (this.tileImage) {
        this.tileImage.src = `./src/tileSprites/solved.png`
      }
    }
  
    public isAMatch (tile:Tile) {
      return this.name === tile.name && this.id !== tile.id
    }
  }