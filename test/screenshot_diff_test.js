
var grunt = require('grunt');
var fs = require('fs');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.screenshot_diff = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  screenshot_diff: function(test) {
    test.expect(4);
    
    var expected = {
      png: 'test/expected/login_widget-v1-v2-diff.png',
      html: 'test/expected/v2-v1-diff.html'
    };
    
    var got = {
      png: 'test/fixtures/login_widget-v1-v2-diff.png',
      html: 'test/fixtures/v2-v1-diff.html'
    };

    test.ok(fs.existsSync(got.png), 'diff image not generated');
    test.ok(fs.existsSync(got.html), 'diff html not generated');
   
    var left = fs.readFileSync(expected.png).toString('base64');
    var right = fs.readFileSync(got.png).toString('base64');
    test.equal(left, right, 'different diff png output');
    
    left = fs.readFileSync(expected.png).toString('base64');
    right = fs.readFileSync(got.png).toString('base64');
    test.equal(left, right, 'different diff html output');
    
    test.done();
  }
};
