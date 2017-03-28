var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var peopleperhour = express.Router();
var name, rating, rate, description, location, skills = new Array(),projects = new Array(), reviews = new Array(),responsedata;
String.prototype.isNumber = function() {return /^\d+$/.test(this);}

var url = 'https://www.peopleperhour.com/freelancer/fredrik/digital-creative/353065';
request(url, function(err, response, html) {
	var $ = cheerio.load(html,{
		ignoreWhitespace: true
	});
	$('.seller-name').filter(function() {
    name = $(this).text().trim();
		name = name.substr(0, name.indexOf('  '));
    console.log('name: ' + name);

		$('.js-about-full-text').filter(function() {
			description = $(this).text().trim();
			console.log('desc: ' + description);

			$('.details-list').filter(function() {
				rate = $(this).children('li').first().text().trim();
				console.log('rate: ' + rate);

				rating = $(this).children('li').first().next().children('span').children('span').text().trim();
				console.log('rating: ' + rating);

				location = $(this).children('li').last().text().trim();
				console.log('location: ' + location);

				$('.widget-tag-list').children('a').each(function(i,elem) {

					skills[i] = $(this).text();

					if( i > 3 )
						return false;

				});

				console.log('skills: ' + skills);

				$('.project-info-container').each(function(i,elem) {

					projecttitle = $(this).children('div').first().text().trim();
					projectby = $(this).children('div').first().next().children('div').children('ul').children('li').first().children('a').last().attr('title');
					projectdate = $(this).children('div').first().next().children('div').children('ul').children('li').first().next().text();
					projectdate = projectdate.substr(projectdate.indexOf(':') + 1).trim();
					projects[i] = {
						"title" : projecttitle,
						"givenby" : projectby,
						"date" : projectdate
					}

					if( i > 3 )
						return false;

				});

				console.log('projects: ' + JSON.stringify(projects));

				$('.item').each(function(i,elem) {

					reviewname = $(this).children('div').first().next().children('header').children('div').first().children('div').first().text().trim();

					reviewcomment = $(this).children('div').first().next().children('p').text();
					reviewlocation = $(this).children('div').first().next().children('header').children('div').first().children('div').first().next().text().trim();

					reviews[i] = {
						"name" : reviewname,
						"comment" : reviewcomment,
						"location" : reviewlocation
					}

					if( i > 3 )
						return false;

				});

				console.log('reviews: ' + JSON.stringify(reviews));


			});
		});
  });
});
