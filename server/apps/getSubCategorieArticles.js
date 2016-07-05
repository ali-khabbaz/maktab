(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getSubCategorieArticles(req, res) {
		var query = 'SELECT \
					  a.name, \
					  a.duration, \
					  a.level_name, \
					  a.id, \
					  a.author_name, \
					  a.resource_name, \
					  a.views, \
					  a.`like` \
					FROM sub_category sc, \
					     subcategory_article_map sam, \
					     articles a \
					WHERE sc.id = sam.subCategory_id \
					AND a.id = sam.article_id \
					AND sc.name = \'' + req.body.subCategoryName + '\'';
		console.log('-------------------', query);
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
	exports.getSubCategorieArticles = getSubCategorieArticles;
}());