var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var freelancerrouter = express.Router();

freelancerrouter.use(bodyparser.json());

  var url = 'https://www.freelancer.com/u/karanagarwal17.html';
  request(url,function(err,res,html){
    var $ = cheerio.load(html);
    $(this).remove('span.online-text');
    $('h1.profile-intro-username').filter(function(){
      var buf = new Buffer(100);
      buf = $(this).text();
      console.log(buf);
      for (var i = 0;buf[i] == ' '; i++ );
      var buffer = new Buffer(100);
      for (var j = 0;buf[i] != ' '; i++,j++){
        buffer[j] = buf[i];
        console.log(buf[i].toString());
      }
      console.log(buffer);
    });
  });
