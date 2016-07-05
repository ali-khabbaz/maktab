(function () {
	var jwt = require('../requires.js').jwt,
		q = require('../requires.js').q,
		showDb = require('../utilities.js').showDb;

	function sections(req, res) {
		var query = "SELECT * FROM videos GROUP BY section_id" +
			" HAVING section_id !=  " + req.body.section_id + " AND " +
			"article_id = " + req.body.article_id + "  ";
		showDb(query).then(function (res_1) {
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
	exports.sections = sections;
}());