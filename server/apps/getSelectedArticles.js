(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getSelectedArticles(req, res) {
		var query = 'SELECT \
					  c.name, \
					  a.name articleName, \
					  a.duration, \
					  a.author_name, \
					  a.resource_name, \
					  a.`like`, \
					  a.views \
					FROM category c, \
					     sub_category sc, \
					     articles a, \
					     subcategory_article_map sam \
					WHERE c.id = sc.category_id \
					AND sc.id = sam.subCategory_id \
					AND a.id = sam.article_id \
					AND a.coursesShow = \'y\'';
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
	exports.getSelectedArticles = getSelectedArticles;
}());