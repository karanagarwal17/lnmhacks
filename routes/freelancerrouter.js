var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var freelancerrouter = express.Router();
var freelancer = require('../models/freelancer.js');

freelancerrouter.use(bodyparser.json());

freelancerrouter.route('/')
/*.all(function(req,res,next){
  console.log('started');
  res.write('start');
  res.next();
})*/
.get(function(req,res,next){
  res.end(req.body.url);
})
.post(function(req,res,next){
  var url = req.body.url;
  res.end(req.body.url);
  request(url,function(err,html){
    if(err) throw err;
    console.log(url);
    /*var $ = cheerio.load(html);
    var name;
    var json = {
      name: ""
    };

    $('.PageProfile-info-name').filter(function(){
      var data = $(this);

      name = data.text();
      json.name = name;
      console.log(name);
      res.end('Done!');
    });*/
  });
});

module.exports = freelancerrouter;
