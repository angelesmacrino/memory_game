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