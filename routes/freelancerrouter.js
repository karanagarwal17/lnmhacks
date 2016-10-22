var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var freelancerrouter = express.Router();
var freelancer = require('./models/freelancer.js');

freelancerrouter.use(bodyparser.json());

freelancerrouter.route('/')
.post(function(req,res,next){
  var url = req.body.url;
  request(url,function(err,response,html){
    if(err) throw err;
    var $ = cheerio.load(html);
    var name;
    var json = {
      name: ""
    };

    $('.PageProfile-info-name').filter(function(){
      var data = $(this);

      name = data.children().first().text();

      json.name = name;
      console.log(name);
      res.end('Done!');
    });
  });
});
