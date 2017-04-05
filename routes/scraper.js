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
var responsedata = {};

scraper.use(bodyparser.json());

scraper.route('/')
.post(function(req,res,next){
  if(req.body.url1) var url1 = req.body.url1;
  if(req.body.url2) var url2 = req.body.url2;
  if(req.body.url3) var url3 = req.body.url3;

  freelancer(url1,function(free){
    toptal(url2,function(top){
      peopleperhour(url3,function(people){

        if(free.hasOwnProperty('name')){
          responsedata.name = free.name;
        }
        else if(top.hasOwnProperty('name')){
          responsedata.name = top.name;
        }
        else if(people.hasOwnProperty('name')){
          responsedata.name = people.name;
        }

        if(free.hasOwnProperty('description')){
          responsedata.description = free.description;
        }
        else if(top.hasOwnProperty('description')){
          responsedata.description = top.description;
        }
        else if(people.hasOwnProperty('description')){
          responsedata.description = people.description;
        }

        if(free.hasOwnProperty('rating')){
          responsedata.rating = free.rating;
        }
        else if(people.hasOwnProperty('rating')){
          responsedata.rating = people.rating;
        }

        if(free.hasOwnProperty('rate')){
          responsedata.rate = free.rate;
        }
        else if(people.hasOwnProperty('rate')){
          responsedata.rate = people.rate;
        }

        if(free.hasOwnProperty('location')){
          responsedata.location = free.location;
        }
        else if(top.hasOwnProperty('location')){
          responsedata.location = top.location;
        }
        else if(people.hasOwnProperty('location')){
          responsedata.location = people.location;
        }

        if(free.hasOwnProperty('skills')){
          responsedata.skills = free.skills;
        }
        else if(top.hasOwnProperty('skills')){
          responsedata.skills = top.skills;
        }
        else if(people.hasOwnProperty('skills')){
          responsedata.skills = people.skills;
        }

        if(free.hasOwnProperty('reviews')){
          responsedata.reviews = free.reviews;
        }
        else if(people.hasOwnProperty('reviews')){
          responsedata.reviews = people.reviews;
        }


        if(top.hasOwnProperty('projects')){
          responsedata.projects = top.projects;
        }
        else if(people.hasOwnProperty('projects')){
          responsedata.projects = people.projects;
        }

        res.json(responsedata);

      });
    });
  });
});

module.exports = scraper;
