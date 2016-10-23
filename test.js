var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var freelancerrouter = express.Router();
var name, description, rating, rate, location, skill, recommendations,reviews = new Array();
String.prototype.isNumber = function(){return /^\d+$/.test(this);}

freelancerrouter.use(bodyparser.json());

  var url = 'https://www.freelancer.com/u/DezineGeek.html';
  request(url,function(err,res,html){
    var $ = cheerio.load(html);
    $(this).remove('span.online-text');
    $('h1.profile-intro-username').filter(function(){
      name = $(this).text().trim();
      name = name.substr(0, name.indexOf("   ")).trim();
      console.log(name);

      $('div.profile-user-byline').filter(function(){
        description = $(this).text().trim();
        console.log(description);

        $('div.Rating').filter(function(){
          rating = $(this).attr('data-star_rating');
          console.log(rating);

          $('div.profile-hourly-rate').filter(function(){
            rate = $(this).children().text().trim();
            console.log(rate);

            $('div.profile-location').filter(function(){
              location = $(this).text().trim();
              location1 = location.substr(0, location.indexOf(","));
              location2 = location.split("   ").pop().trim();
              location = location1 + ", " + location2;
              console.log(location);

              $('div.profile-recommendation').filter(function(){
                recommendations = $(this).text().trim();
                recommendations = recommendations.substr(0, recommendations.indexOf(" ")).trim();
                console.log(recommendations);

                $('.VerificationsList').each(function(){
                  skill = $(this).last().text().replace(/\s\s+/g, ' ').split(" ",20).slice(1,20);
                });
                var skill1 = "",skills = new Array(0);
                for(var i = 0,j = 0; j < 6; i++){
                  if(skill[i].isNumber()){
                    skills.push(skill1);
                    skill1 = "";
                    j++;
                  }
                  else {
                    skill1 = skill1 + " " + skill[i];
                  }
                }
                console.log(skills);

                $('.user-review-title').filter(function(){
                  reviewtitle = $(this).text().trim();
                  reviewrating = $(this).parent().children('.Rating').attr('data-star_rating');
                  reviewprice = $(this).parent().children('.user-review-price').text();
                  reviewcomment = $(this).parent().children('p').text();
                  reviewauthor = $(this).parent().children('.user-review-details').text().trim();
                  reviewauthor = reviewauthor.substr(0,reviewauthor.indexOf(" "));
                  var newreview = {
                    "title":reviewtitle,
                    "rating":reviewrating,
                    "price":reviewprice,
                    "comment":reviewcomment,
                    "author":reviewauthor
                  };
                  reviews.push(newreview);
                });
                console.log(reviews);
              });
            });
          });
        });
      });
    });
  });
