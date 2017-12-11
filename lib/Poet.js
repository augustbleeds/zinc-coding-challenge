var axios = require('axios');
var cheerio = require('cheerio');

class Poet {
  /**
   * Initializes default values
   * @member {String} httpResponse - XML data
   * @member {Array of Objects} count - List of count objects [{name: <speaker>, numLines: <count>}]
   * @member {Object} _speakerInd - Index of speaker in count array {<speaker>: <index>}
   */
  constructor(store){
    this.httpResponse = null;
    this.store = store;
  }

  getPlay(link) {
    return new Promise((resolve, reject) => {
      axios.get(link)
        .then(resp => {
          if(resp.status !== 200 || typeof resp.data !== 'string' || !resp.data.match(/<!DOCTYPE PLAY SYSTEM "play.dtd">/)){
            reject(new Error('URI does not return an XML file of DTD type "play.dtd"'));
          }
          this.httpResponse = resp.data;
          resolve(true);
        })
        .catch(err => reject(err))
    })
  }

  analyze(){
    var $ = cheerio.load(this.httpResponse, { xmlMode: true });
    var speeches = $('PLAY').find('SPEECH');
    speeches.each( (i, speech) => {
      var speakers = $(speech).children('SPEAKER');
      var numLines = $(speech).children('LINE').length;
      speakers.each( (i, speaker) => {
        var speakerName = $(speaker).text()
        if(speakerName.toUpperCase() !== 'ALL'){
          this.store.add(speakerName, numLines)
        }
      });
    });
  }

  list(){
    return this.store.list();
  }

}

module.exports = Poet;
