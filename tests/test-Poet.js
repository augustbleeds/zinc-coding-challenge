var chai = require('chai');
var expect = chai.expect;
var nock = require('nock');
var sinon = require('sinon');
var CountManager = require('../lib/CountManager');
var Poet = require('../lib/Poet');

var sampleResponse = `
<?xml version="1.0"?>
<!DOCTYPE PLAY SYSTEM "play.dtd">
  <PLAY>
    <TITLE> Shortest Play Ever </TITLE>
    <ACT>
      <TITLE> ACT I </TITLE>
      <SCENE>
        <TITLE> SCENE I. The Supermarket. </TITLE>
        <SPEECH>
          <SPEAKER>Spiderman</SPEAKER>
          <LINE> What do we need to buy? </LINE>
          <LINE> I'm tired of eating sandwiches. </LINE>
        </SPEECH>
        <SPEECH>
          <SPEAKER>Thor</SPEAKER>
          <LINE> Eggs, tomatoes, and cereal. </LINE>
        </SPEECH>
      </SCENE>
    </ACT>
  </PLAY>`;

describe('Testing Poet Object', function() {

  it('getPlay() sets valid HTTP Response and returns true', async () => {
    nock(/.*/)
      .get(/.*/)
      .reply(200, sampleResponse);

    var p = new Poet({});
    var result = await p.getPlay('http://www.anyvalidlink.com');

    expect(result).to.equal(true);
    expect(p.httpResponse).to.equal(sampleResponse);
  });

  it('getPlay() throws error on invalid HTTP Response type', async () => {
    nock(/.*/)
      .get(/.*/)
      .reply(200, {'this': 'should not be json'});

    var p = new Poet({});
    return p.getPlay('http://www.anyinvalidlink.com')
      .catch(err => {
        expect(err).to.be.an('error');
      });
  });

  it('getPlay() throws error on invalid URI', async () => {
    nock(/.*/)
      .get(/.*/)
      .reply(500, {'this': 'should not be json'});

    var p = new Poet({});
    return p.getPlay(undefined)
      .catch(err => {
        expect(err).to.be.an('error');
      });
  });


  it('analyze() adds correct data to the store', () => {
    var mockAdd = sinon.stub();
    mockAdd.returns(true);

    var p = new Poet({add: mockAdd});
    p.httpResponse = sampleResponse;
    p.analyze();

    expect(mockAdd.getCall(0).calledWith('Spiderman', 2)).to.equal(true);
    expect(mockAdd.getCall(1).calledWith('Thor', 1)).to.equal(true);
  });

  it('list() returns sorted array of objects', () => {
    var mockList = sinon.stub();
    var ans = [{name: 'Spiderman', numLines: 2}, {name: 'Thor', numLines: 1}];
    mockList.returns(ans);

    var p = new Poet({list: mockList})

    expect(p.list()).to.eql(ans);
  });

});
