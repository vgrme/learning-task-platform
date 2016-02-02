var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var webpackConfigBuilder = require('./webpack.config');
var webpackConfig = webpackConfigBuilder('development');

var server = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
});
// Important part. Send down index.html for all requests
server.use('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/src/index.html'));
});

server.listen(3000, 'localhost', function (err, result) {
  if (err) { console.log(err) }
  console.log('Listening at localhost:3000');
});