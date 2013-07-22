# grunt-screenshot-diff

> Compare images taken in different test runs and highlight differences

A grunt plugin that wraps [automated-screenshot-diff](https://github.com/igorescobar/automated-screenshot-diff) to automate screenshot comparisons.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-screenshot-diff --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-screenshot-diff');
```

## The "screenshot_diff" task

### Overview
In your project's Gruntfile, add a section named `screenshot_diff` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  screenshot_diff: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

This task is a [multi task](https://github.com/gruntjs/grunt/blob/master/docs/types_of_tasks.md#multi-tasks), meaning that grunt will automatically iterate over all exec targets if a target is not specified.

Directories to run screenshot comparisons in are specified in the [files](http://gruntjs.com/configuring-tasks#files) section of the task configuration, however only `src` files are used.  The most common configuration would be to specify `files` as an array of paths in which to compare screenshots.

### Options

#### options['previous-release']
Type: `String`
Default value: `'v1'`

A string used to identify screenshots associated with a previous version to use in the comparison.

#### options.['current-release']
Type: `String`
Default value: `'v2'`

A string used to identify screenshots associated with the current version to use in the comparison.

#### options.['ignore-not-changed']
Type: `String`
Default value: `false`

A boolean used to control whether not changed scenarios are saved in the generated difference report.

#### options.outputFormat
Type: `String`
Default value: `'html'`

One of `'html'` or `'json'`, controls the format of the generated difference report

### Usage Examples

#### Default Options
In this example, we compare screenshots using the default options which generate a difference report between files tagged with v1 and v2 in the `screenshots` folder.

```js
grunt.initConfig({
  screenshot_diff: {
    options: {
    },
    files: ['screenshots'],
  },
})
```

#### Custom Options
In this example, custom options are used change the tags used to identify the versions, change the output format to json and include unchanged files in the resulting report.

```js
grunt.initConfig({
  screenshot_diff: {
    options: {
      'previous-release': 'prev',
      'current-release': 'curr',
      'ignore-not-changed': true,
      outputFormat: 'json'
    },
    files: ['screenshots'],
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## TODO

* there is no handling of incorrect path specifications, for instance if the files configuration points to a file instead of a path.
* there is no handling of various erroneous configurations that could be set
* there is no testing of multiple task configurations or multiple source files
* there are no tests to handle various error conditions

## Release History
_(Nothing yet)_
