var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('vendor/chartist/chartist.js');
  app.import('vendor/chartist/chartist.css');

  return app.toTree();
};
