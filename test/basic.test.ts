// import { assert, expect, it, test } from 'vitest'
// import { GameBoard, Tile, Chronometer } from '../src/main'

// class FakeBoard extends GameBoard {
//    public generateNewTile(tileName:string): Tile {
//       return super.generateNewTile(tileName)
//    }
//    public generateTiles(tiles: string[]): Tile[] {
//      return super.generateTiles(tiles)
//    }
//    public appendTiles(tiles: Array<Tile>) {
//       return super.appendTiles(tiles)
//    }
//    public shuffleTiles(tiles: Array<Tile>, randomInt: number) {
//       return super.shuffleTiles(tiles, randomInt)
//    }
// }
// class FakeChronometer extends Chronometer {

//    public setSecondsMinutesHours(seconds:number, minutes:number, hours:number) {
//       return super.setSecondsMinutesHours(seconds, minutes, hours)
//    }
//    public setTimeToHTML (s:string, m:string , h:string) {
//       return super.setTimeToHTML(s, m, h)
//    }
// }
// let fakeBoard = new FakeBoard()
// let fakeChronometer = new FakeChronometer('chronometer')
// test("Single tile generation", ()=> {
//    //'Given a string, generate a tile'
//    expect(fakeBoard.generateNewTile('a')).toBeInstanceOf(Tile)
//    //'Tile has same name as given string'
//    expect(fakeBoard.generateNewTile('a').getTileName()).toBe('a')
//    //'Tile is initially hidden'
//    expect(fakeBoard.generateNewTile('a').getTileShown()).toEqual(false)
//    console.log(fakeBoard.generateNewTile(''))
// })
// test("Array of tiles generated", () => {
//    const tilesToCreate = ['a', 'b', 'c']
//    //"Given an array of strings, generates an array of tiles"
//    expect(fakeBoard.generateTiles(tilesToCreate)).toBeInstanceOf(Array<Tile>)
//    //"All tiles are processed"
//    expect(fakeBoard.generateTiles(tilesToCreate).length).toBe(tilesToCreate.length)
//    //"Generated tiles have exact the same name of original array"
//    const tiles = fakeBoard.generateTiles(tilesToCreate)
//    for (let i = 0; i < tilesToCreate.length; i++) {
//       expect(tilesToCreate[i]).toBe(tiles[i].getTileName())
//    }
//    //"Generated tiles are hidden"
//    fakeBoard.generateTiles(tilesToCreate).forEach((tile)=> {
//       expect(tile.getTileShown()).toEqual(false)
//    })
//    //"Empty array return empty tiles"
//    expect(fakeBoard.generateTiles([]).length).toBe(0)
// })
// test("Game board generation", () => {
//    const Tiles : Array<Tile> = [fakeBoard.generateNewTile('a'), fakeBoard.generateNewTile('b'), fakeBoard.generateNewTile('c')]
//    const generatedTiles = fakeBoard.appendTiles(Tiles)
//    //Given an array of tiles, generates a game board with such tiles duplicated
//    expect(generatedTiles).toBeInstanceOf(Array<Tile>)
//    expect(generatedTiles.length).toBe(Tiles.length * 2)
//    Tiles.forEach((tile)=> {
//       expect(generatedTiles.filter((generatedTile)=> {
//          return (generatedTile.getTileName() === tile.getTileName() && generatedTile.getTileShown() === tile.getTileShown())
//       }).length).toBe(2)
//    })
//    //TODO: test de shuffling de array 
// })
// test("GameBoard renderization", () => {
//  //Individual tile
//  //Given a tile, creates a img tag with the tile id as id and 'back.png' as src
//  const Tiles : Array<Tile> = [fakeBoard.generateNewTile('a'), fakeBoard.generateNewTile('b'), fakeBoard.generateNewTile('c')]
//    Tiles.forEach((tile)=> {
//       expect(tile.createTileImage()).toBeInstanceOf(HTMLImageElement)
//       expect(tile.createTileImage().id).toBe(tile.getTileID())   
//       expect(tile.createTileImage().src).toContain('back.png')})
// //For each tile, a card div will be rendered
// Tiles.forEach((tile)=> {
//   expect(tile.createTileCard()).toBeInstanceOf(HTMLDivElement)
//    expect(tile.createTileCard().id).toBe(`tile ${tile.getTileID()}`)
//    expect(tile.createTileCard().className).toBe('boardCard')
// })
// })
// test("Chronometer", () => {
// //The seconds increase ony by one
//    expect(fakeChronometer.setSecondsMinutesHours(0, 0, 0)).toEqual([1, 0, 0])
//    expect(fakeChronometer.setSecondsMinutesHours(51, 0, 0)).toEqual([52, 0, 0])
// //When reaching 60 seconds, the minutes increase by one and the seconds return to 0
//    expect(fakeChronometer.setSecondsMinutesHours(59, 0, 0)).toEqual([0, 1, 0])
//    expect(fakeChronometer.setSecondsMinutesHours(59, 1, 0)).toEqual([0, 2, 0])
//    expect(fakeChronometer.setSecondsMinutesHours(59, 1, 5)).toEqual([0, 2, 5])
// //When reaching 60 minutes, the hours increase by one and the minutes return to 0
//    expect(fakeChronometer.setSecondsMinutesHours(59, 59, 0)).toEqual([0, 0, 1])
//    expect(fakeChronometer.setSecondsMinutesHours(59, 59, 1)).toEqual([0, 0, 2])
//    expect(fakeChronometer.setSecondsMinutesHours(59, 59, 5)).toEqual([0, 0, 6])
// //Proper timer stringification
//    expect(fakeChronometer.setTimeToHTML('1', '1', '1')).toEqual('01:01:01')
//    expect(fakeChronometer.setTimeToHTML('1', '1', '10')).toEqual('10:01:01')
//    expect(fakeChronometer.setTimeToHTML('1', '10', '10')).toEqual('10:10:01')
//    expect(fakeChronometer.setTimeToHTML('10', '10', '10')).toEqual('10:10:10')
//    expect(fakeChronometer.setTimeToHTML('10', '10', '100')).toEqual('100:10:10')
//    expect(fakeChronometer.setTimeToHTML('0', '0', '0')).toEqual('00:00:00')
// })


