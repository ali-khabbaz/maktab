/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getTopSubCategories(req, res) {
		var query = 'SELECT \
					  sc.id, \
					  sc.name \
					FROM sub_category sc \
					WHERE sc.first_page = \'Y\'';
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
	exports.getTopSubCategories = getTopSubCategories;
}());