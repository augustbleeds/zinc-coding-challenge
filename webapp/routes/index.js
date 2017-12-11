var express = require('express');
var router = express.Router();
var Poet = require('../../lib/Poet');
var CountManager = require('../../lib/CountManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Speaker Facts' });
});

router.get('/api', async function(req, res, next ) {
  var p = new Poet(new CountManager());
  try {
    var result = await p.getPlay(req.query.link);
  } catch(error) {
    res.json({'errors': [{
      status: 422,
      detail: 'Incorrect URI submitted',
    }]});
    return;
  }
  p.analyze();
  res.json({'data': p.list()});
});


module.exports = router;
