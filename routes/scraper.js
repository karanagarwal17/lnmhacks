var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var scraper = express.Router();
var freelancer = require('../scraper/freelancer');
var peopleperhour = require('../scraper/peopleperhour');
var toptal = require('../scraper/toptal');
var free, top, people;

scraper.use(bodyparser.json());

scraper.route('/')
.post(function(req,res,next){
  var url1 = req.body.url1;
  var url2 = req.body.url2;
  var url3 = req.body.url3;

  freelancer(url1,function(free){
    toptal(url2,function(top){
      peopleperhour(url3,function(people){
        var responsedata = {
          "free" : free,
          "top" : top,
          "people" : people
        };

        res.json(responsedata);

      });
    });
  });
});

module.exports = scraper;
