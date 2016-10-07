/*jshint multistr: true */
(function () {
	'use strict';
	var c = require('../../server.js').c,
		showDbNew = require('../utilities.js').showDbNew;


	function getBestArticles(req, res) {
		var query =
			'SELECT \
					  a.id articleId, \
					  a.name articleName, \
					  a.duration articleDuration, \
					  a.level_name articleLevelName, \
					  a.author_name articleAuthorName, \
					  a.resource_name articleResourceName, \
					  a.views articleViews, \
					  a.`like` articleLike \
					FROM articles a \
					WHERE a.firstPage = \'Y\'';
		showDbNew(c, query).then(function (res1) {
			res.send({
				'err': null,
				'data': res1
			});
		}).fail(function (err) {
			res.send({
				'err': err,
				'data': ''
			});
		});
	}
	exports.getBestArticles = getBestArticles;
}());
