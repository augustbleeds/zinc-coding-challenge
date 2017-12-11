class CountManager {
  constructor(){
    this.count = [];
    this._speakerInd = {};
  }

  add(speaker, numLines){
    if(!this._speakerExists(speaker)) this._tagSpeaker(speaker);
    this._retrieveSpeaker(speaker).numLines += numLines;
    return true;
  }

  list(){
    this.count.sort((a,b) => b.numLines - a.numLines);
    return this.count;
  }

  _speakerExists(speaker) {
    return this._speakerInd.hasOwnProperty(speaker);
  }

  _tagSpeaker(speaker) {
    this._speakerInd[speaker] = this.count.length;
    this.count.push({'name': speaker, 'numLines': 0})
  }

  _retrieveSpeaker(speaker) {
    return this.count[this._speakerInd[speaker]];
  }
}

module.exports = CountManager;
