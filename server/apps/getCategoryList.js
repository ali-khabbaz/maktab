(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb;

	function getCategoryList(req, res) {
		var query = 'SELECT c.name,c.id,s.category_id,s.name as subname ' +
			'FROM category c inner join sub_category s on s.category_id = c.id';
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
	exports.getCategoryList = getCategoryList;
}());