/*jshint multistr: true */
(function () {
	'use strict';
	var c = require('../../server.js').c,
		showDbNew = require('../utilities.js').showDbNew;

	function getTopSubCategories(req, res) {
		var query = 'SELECT \
					  sc.id, \
					  sc.name, \
					  sc.perisan_name \
					FROM sub_category sc \
					WHERE sc.first_page = \'Y\'';
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
	exports.getTopSubCategories = getTopSubCategories;
}());