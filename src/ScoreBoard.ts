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
  
  }