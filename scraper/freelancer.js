var express = require('express');
var fs = require('fs');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var cheerio = require('cheerio');
var name, description, rating, rate, location, skills = new Array(),
	reviews = new Array(),
	responsedata;
String.prototype.isNumber = function() {
	return /^\d+$/.test(this);
}

var freelancer = function(url, callback) {
	if(!url) callback();
	//var url = 'https://www.freelancer.com/u/DezineGeek.html';
	request(url, function(err, response, html) {
		var $ = cheerio.load(html, {
			ignoreWhitespace: true
		});
		$(this).remove('span.online-text');
		$('h1.profile-intro-username').filter(function() {
			name = $(this).text().trim();
			name = name.substr(0, name.indexOf("   ")).trim();
			console.log(name);

			$('div.profile-user-byline').filter(function() {
				description = $(this).text().trim();
				console.log(description);

				$('div.Rating').filter(function() {
					rating = $(this).attr('data-star_rating');
					console.log(rating);

					$('div.profile-hourly-rate').filter(function() {
						rate = $(this).children().text().trim();
						console.log(rate);

						$('div.profile-location').filter(function() {
							location = $(this).text().trim();
							location1 = location.substr(0, location.indexOf(","));
							location2 = location.split("   ").pop().trim();
							location = location1 + ", " + location2;
							console.log(location);

							$('.VerificationsList').last().children('li').each(function(i, elem) {
								skills[i] = $(this).children('span').first().children('a').text().trim();

								if (i > 3)
									return false;
							});
							console.log(skills);

							$('.user-review-title').each(function(i, elem) {
								reviewtitle = $(this).text().trim();
								reviewrating = $(this).parent().children('.Rating').attr('data-star_rating');
								reviewprice = $(this).parent().children('.user-review-price').text();
								reviewcomment = $(this).parent().children('p').text();
								reviewauthor = $(this).parent().children('.user-review-details').text().trim();
								reviewauthor = reviewauthor.substr(0, reviewauthor.indexOf(" ")).replace(/(\r\n|\n|\r)/gm, "");;
								var newreview = {
									"title": reviewtitle,
									"rating": reviewrating,
									"price": reviewprice,
									"comment": reviewcomment,
									"author": reviewauthor
								};
								reviews.push(newreview);

								if (i > 3)
									return false;
							});
							console.log(reviews);
							responsedata = {
								"name": name,
								"description": description,
								"rating": rating,
								"rate": rate,
								"location": location,
								"skills": skills,
								"reviews": reviews
							};
							callback(responsedata);
						});
					});
				});
			});
		});
	});
}
module.exports = freelancer;
