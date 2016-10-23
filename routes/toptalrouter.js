var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var toptalrouter = express.Router();
var name, description, rating, rate, location, skill, recommendations,reviews = new Array(),responsedata;
String.prototype.isNumber = function(){return /^\d+$/.test(this);}

toptalrouter.use(bodyparser.json());

toptalrouter.route('/')
.post(function(req,res,next){
  var url = req.body.url;
  request(url,function(err,response,html){
    var $ = cheerio.load(html);
    $(".resume_top-info_name").filter(function(){
      name = $(this).text();
    });
  });
});

module.exports = toptalrouter;
