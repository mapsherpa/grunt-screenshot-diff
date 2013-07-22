/*
 * grunt-screenshot-diff
 * https://github.com/mapsherpa/grunt-screenshot-diff
 *
 * Copyright (c) 2013 Paul Spencer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  
  var async = require('async');
  var path = require('path');

  grunt.registerMultiTask('screenshot_diff', 'Compare screenshots in a folder.', function() {
    
    var done = this.async();
    
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      'previous-release': 'v1',
      'current-release': 'v2',
      'ignore-not-changed': false,
      'outputFormat': 'html'
    });
    
    grunt.log.writeln(JSON.stringify(this.files));

    // Iterate over all specified file groups.
    async.every(this.files, function(f, doneOne) {
      if (f.src.length) {
        grunt.util.async.forEachSeries(f.src,function (srcFile, next) {
          var opts = ['compare'];
          // automated-screenshot-diff requires trailing slash unfortunately
          opts.push('--source='+path.normalize(path.join(srcFile, '.')) + '/');
          grunt.util._.forEach(options,function(value, option) {
            opts.push('--'+option+'='+value);
          });
          grunt.util.spawn({
            cmd: __dirname + '/../node_modules/.bin/automated-screenshot-diff',
            args: opts
          }, function (errorObj, result, code) {
            if (code > 0) {
              grunt.log.error('error');
              grunt.log.error(result.stdout);
              return next(false);
            }
            if (result.stdout) {
              grunt.verbose.write(result.stdout + '\n\n');
            }
            if (result.stderr) {
              grunt.verbose.write(result.stderr + '\n\n');
            }
            next();
          });
        }, function (err) {
          if (err) {
            grunt.log.error('error:', err);
          }
          doneOne(err ? false : true);
        });
      }
    }, function(passed) {
      done(passed);
    });
  });

};
