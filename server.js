var path = require('path');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var port = process.env.PORT || 3000;

var baseApiUrl = process.env.NODE_ENV === "development"? 'http://localhost:9000':
                 (process.env.NODE_ENV === "demo"? 'http://cy-demo-api.herokuapp.com': process.env.API_URL);

var app = express();

var static_path = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "demo"? 'src':'';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(favicon(path.join(__dirname, 'favicon.ico')));

var callApi = function(req, res){
  var options = {
    method: req.method,
    baseUrl: baseApiUrl,
    url: req.originalUrl
  }
  if(req.body!={}){
    options.json = req.body;
  }
  if(req.headers.authorization){
    options.headers = options.headers || {};
    options.headers.authorization = req.headers.authorization
  }

  request(options, function (error, response, body) {
    if (!error && response.statusCode<400) {
      res.status(response.statusCode).send(body)
    }
    else{
      res.status(response.statusCode).send(error)
    }
  });
};

if(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "demo"){
  var webpack = require('webpack');
  var webpackConfigBuilder = require('./webpack.config');
  var webpackConfig = webpackConfigBuilder('development');

  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
}

app.use('/api', callApi);
app.use('/auth', callApi);

app.use(express.static(path.join(__dirname, static_path)));

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, static_path) });
});

app.listen(port, function (error) {
  if (error) throw error;

  console.log('server running at localhost:', port);
});