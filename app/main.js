var Poet = require('../lib/Poet')
var CountManager = require('../lib/CountManager');

var store = new CountManager()
var p = new Poet(store);
p.getPlay('http://www.ibiblio.org/xml/examples/shakespeare/macbeth.xml')
  .then(result => {
    p.analyze()
    console.log(p.list())
  })
  .catch( err => console.log(err))
