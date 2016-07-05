/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getSearchResult(req, res) {
		var query = 'SELECT \
					  c.name categoryName, \
					  sc.name subCategoryName, \
					  a.name articleName, \
					  a.id articleId, \
					  a.duration articleDuration, \
					  a.insert_date articleInsertDate, \
					  a.released_date articleReleaseDate, \
					  a.level_name articleLevel, \
					  a.author_name articleAuthor, \
					  a.resource_name articleResource, \
					  a.views articleViews, \
					  a.`like` articleLikes \
					FROM category c, \
					     sub_category sc, \
					     subcategory_article_map sam, \
					     articles a \
					WHERE c.id = sc.category_id \
					AND sam.subCategory_id = sc.id \
					AND sam.article_id = a.id \
					AND a.name LIKE \'%' + req.body.searchWord + '%\' \
					ORDER BY categoryName ASC, subCategoryName ASC';
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
	exports.getSearchResult = getSearchResult;
}());