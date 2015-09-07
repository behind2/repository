require.config({
  // make components more sensible
  // expose jquery
  paths: {
    "jquery": "./lib/jquery"
  }
});

if (!window.requireTestMode) {
  require(['main']);
}





