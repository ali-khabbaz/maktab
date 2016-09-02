/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getTopArticles(req, res) {
		var query = 'CALL `getTopArticles`()';
		showDb(query).then(function (res1) {
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
	exports.getTopArticles = getTopArticles;
}());
