/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getTopCategories(req, res) {
		var query = 'SELECT \
					  c.name categoryName, \
  					  sc.name subCategoryName \
					FROM category c, \
					     sub_category sc \
					WHERE c.selected = \'Y\' \
					AND sc.category_id = c.id \
					ORDER BY categoryName ASC';
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
	exports.getTopCategories = getTopCategories;
}());