/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getTopArticles(req, res) {
		var query = 'SELECT \
					  * \
					FROM (SELECT \
					    @row_number := CASE WHEN @customer_no = sc.name THEN @row_number + 1 ELSE 1 END AS num, \
					    @customer_no := sc.name AS CustomerNumber, \
					    sc.id subCategoryId, \
					    sc.name subCategoryName, \
					    a.name articleName, \
					    a.duration articleDuration, \
					    a.resource_name articleResourceName, \
					    a.level_name articleLevelName, \
					    a.author_name articleAuthorName, \
					    a.views articleViews, \
					    a.`like` articleLike, \
					    a.id articleId \
					  FROM sub_category sc, \
					       subcategory_article_map sam, \
					       articles a, \
					       (SELECT \
					           @customer_no := 0, \
					           @row_number := 0) AS t \
					  WHERE sc.first_page = \'Y\' \
					  AND sam.subCategory_id = sc.id \
					  AND sam.article_id = a.id) AS jafang \
					WHERE jafang.num < 9';
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