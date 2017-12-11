var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var sinon = require('sinon');
var CountManager = require('../lib/CountManager');

describe('Testing CountManager Object Store', function() {
  it('add() method correctly adds speaker/numLine pair', () => {
    var store = new CountManager();
    store.add('Bob', 3);
    store.add('Charlie', 7);
    store.add('Shakespeare', 4);
    store.add('Charlie', 7);
    expect(store.count).to.eql([{name: 'Bob', numLines: 3},
    {name: 'Charlie', numLines: 14},
    {name: 'Shakespeare', numLines: 4}]);
  });

  it('list() method correctly sorts and returns list of objects', () => {
    var store = new CountManager();
    store.count = [{name: 'Bob', numLines: 3}, {name: 'Charlie', numLines: 14},
    {name: 'Shakespeare', numLines: 4}];

    expect(store.list()).to.eql([{name: 'Charlie', numLines: 14},
    {name: 'Shakespeare', numLines: 4}, {name: 'Bob', numLines: 3}]);
  });
})
