const express = require('express')
const debug = require('debug')('app:server')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config')
const config = require('../config')

const request = require('request');

const app = new express()
const api = new express()
const paths = config.utils_paths

const cors = require('cors')

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement universal
// rendering, you'll want to remove this middleware.
app.use(require('connect-history-api-fallback')())

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enable webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : paths.client(),
    hot         : true,
    quiet       : config.compiler_quiet,
    noInfo      : config.compiler_quiet,
    lazy        : false,
    stats       : config.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')))
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.dist()))
}

api.use(cors());

api.get('/nbastats/:years/:playerid', (req, res) => {
    var year = req.params.years;
    var playerid = req.params.playerid;

    var shot_chart_url = 'http://stats.nba.com/stats/shotchartdetail?CFID=33&CFPAR'+
    'AMS='+year+'&ContextFilter=&ContextMeasure=FGA&DateFrom=&D'+
    'ateTo=&GameID=&GameSegment=&LastNGames=0&LeagueID=00&Loca'+
    'tion=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&'+
    'PaceAdjust=N&PerMode=PerGame&Period=0&PlayerID='+playerid+'&Plu'+
    'sMinus=N&Position=&Rank=N&RookieYear=&Season=2015-16&Seas'+
    'onSegment=&SeasonType=Regular+Season&TeamID=0&VsConferenc'+
    'e=&VsDivision=&mode=Advanced&showDetails=0&showShots=1&sh'+
    'owZones=0';

    request.get(shot_chart_url, function(err, _res, body){
        res.json(JSON.parse(body));
    });
});

api.listen(5656, () => {
    console.log('API listening on port 5656');
});

module.exports = app
