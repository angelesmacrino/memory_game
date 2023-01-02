export class Options {
    private numberOfPairs: number;
    private backStyle: String;
    private cardTheme: String;

    constructor(numberOfPairs: number, backStyle: String, cardTheme: String) {
        this.numberOfPairs = numberOfPairs;
        this.backStyle = backStyle;
        this.cardTheme = cardTheme;
    }
    public changeOptions(options: FormData) {
        // for (const pair of options.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        //   }
        this.numberOfPairs = Number(options.get('numberOfPairs'));
        this.backStyle = String(options.get('backStyle'));
        this.cardTheme = String(options.get('cardTheme'));
        // console.log(this.backStyle)
    }
    public getNumberOfPairs() {
        return this.numberOfPairs;
    }
    public getBackStyle() {
        return this.backStyle;
    }
    public getCardTheme() {
        return this.cardTheme;
    }
}