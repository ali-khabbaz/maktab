/*jshint multistr: true */
(function () {
	'use strict';
	var c = require('../../server.js').c,
		showDbNew = require('../utilities.js').showDbNew;

	function getTopArticles(req, res) {
		var query = 'CALL `getTopArticles`()';
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
	exports.getTopArticles = getTopArticles;
}());
