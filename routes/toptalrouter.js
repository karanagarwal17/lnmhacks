var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var toptalrouter = express.Router();
var name, description, location, skills = new Array(),
	projects = new Array(),
	responsedata;
String.prototype.isNumber = function() {
	return /^\d+$/.test(this);
}

toptalrouter.use(bodyparser.json());

toptalrouter.route('/')
	.post(function(req, res, next) {
		var url = req.body.url;
		//var url = 'https://www.toptal.com/resume/eric-w-greene';
		request(url, function(err, response, html) {
			var $ = cheerio.load(html);
			$(".resume_top-info_name").filter(function() {
				name = $(this).text();
				console.log('name: ' + name);

				$(".resume_top-info_bio").filter(function() {
					description = $(this).text();
					console.log('description: ' + description);

					$(".resume_top-info_location").filter(function() {
						location = $(this).text();
						console.log('location: ' + location);

						$(".is-expert").each(function(i, elem) {
							skills[i] = $(this).text();
							if (i >= 4)
								return false;
						});

						console.log('skills: ' + skills);

						$('.js-experience').children('.resume_section-inner').children('.resume_section-content').children('ul').children('.resume_section-content_item').each(function(i, elem) {
							var projecttitle = $(this).children('.resume_section-content_title').text();
							console.log('projecttitle: ' + projecttitle);
							var projectdesc = $(this).children('.muted').children('p').first().text();
							console.log('projectdesc: ' + projectdesc);

							var newproject = {
								"title": projecttitle,
								"description": projectdesc
							}

							projects.push(newproject);

							if (i > 4)
								return false;

						});

						console.log('projects: ' + JSON.stringify(projects));

						responsedata = {
							"name": name,
							"description": description,
							"location": location,
							"skills": skills,
							"projects": projects
						};

						res.json(responsedata);

					});
				});
			});
		});
	});

module.exports = toptalrouter;
