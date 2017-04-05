var express = require('express');
var path = require('path');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var freelancer = require('./scraper/freelancer.js');
var toptal = require('./scraper/toptal.js');
var peopleperhour = require('./scraper/peopleperhour.js')
var app = express();
var scraper = require('./routes/scraper');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(favicon());
app.use(logger('dev'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/scraper',scraper);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
