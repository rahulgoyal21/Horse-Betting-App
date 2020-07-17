class GameData {
  constructor({ id, startTime, totalToWin, tracks, addOns }) {
    this.id = id;
    this.startTime = new Date(startTime).toString().substr(0, 25);
    this.totalToWin = totalToWin;
    this.tracks = tracks;
    this.addOns = addOns;
  }
}
export default GameData;
