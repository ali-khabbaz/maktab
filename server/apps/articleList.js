(function () {

	var jwt = require('../requires.js').jwt,
		q = require('../requires.js').q,
		c = require('../../server.js').c,
		showDb = require('../utilities.js').showDb,
		showDbNew = require('../utilities.js').showDbNew;

	function articleList(req, res) {
		var query = "SELECT article_id, article_name, duration, released_date," +
			"level_name, author_name, resource_name, desc_small, desc_big FROM articles";
		showDb(c, query).then(function (res_1) {
			res.send({
				"err": null,
				"data": res_1
			});
		}).fail(function (err_1) {
			res.send({
				"err": err_1,
				"data": ''
			});
		});

	}

	exports.articleList = articleList;
}());
