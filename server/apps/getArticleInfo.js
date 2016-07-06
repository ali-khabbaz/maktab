/*jshint multistr: true */
(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb,
		q = require('../requires.js').q;

	function getArticleInfo(req, res) {
		var funcs = [],
			query = 'SELECT \
					  v.article_id, \
					  v.section_id, \
					  v.video_id, \
					  v.duration, \
					  v.views, \
					  v.like, \
					  v.section_name, \
					  v.video_name, \
					  v.duration, \
					  a.name, \
					  a.views, \
					  a.released_date, \
					  a.level_name, \
					  a.author_name, \
					  a.resource_name, \
					  a.duration articleDuration, \
					  a.desc_small, \
					  a.desc_big, \
					  a.views articleViews, \
					  sc.name subCategoryName, \
					  c.name categoryName \
					FROM videos v, \
					     articles a, \
					     sub_category sc, \
					     subcategory_article_map sam, \
					     category c \
					WHERE v.article_id = \'' + req.body.article_id + '\' \
					AND v.article_id = a.id \
					AND sam.article_id = a.id \
					AND c.id = sc.category_id \
					AND sam.subCategory_id = sc.id';
		funcs.push(showDb(query));
		query = 'SELECT \
				  a.id articleId, \
				  a.name articleName, \
				  a.author_name authorName, \
				  a.`like`, \
				  a.views \
				FROM articles a, \
				     software s, \
				     software_article_map sam \
				WHERE a.id = sam.article_id \
				AND s.id = sam.software_id \
				AND s.name IN (SELECT \
				    s.name \
				  FROM articles a, \
				       software s, \
				       software_article_map sam \
				  WHERE a.id = sam.article_id \
				  AND s.id = sam.software_id \
				  AND a.id = ' + req.body.article_id + ')';
		funcs.push(showDb(query));
		q.all(funcs).then(function (res1) {
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
	exports.getArticleInfo = getArticleInfo;
}());