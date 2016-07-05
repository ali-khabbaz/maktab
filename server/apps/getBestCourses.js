/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getBestCourses(req, res) {
		var query = 'SELECT \
					  c.name, \
					  sc.name \
					FROM category c, \
					     sub_category sc \
					WHERE c.selected = \'Y\' \
					AND sc.category_id = c.id';
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
	exports.getBestCourses = getBestCourses;
}());