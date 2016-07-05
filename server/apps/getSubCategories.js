(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getSubCategories(req, res) {
		var query = 'SELECT \
					  sc.name \
					FROM sub_category sc, \
					     category c \
					WHERE c.name = \'' + req.body.categoryName + '\' \
					AND c.id = sc.category_id';
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
	exports.getSubCategories = getSubCategories;
}());