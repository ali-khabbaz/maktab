(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb,
		q = require('../requires.js').q;

	function getTopCards(req, res) {
		var query = 'select s.logo,s.id,s.category_id,s.name,s.img from sub_category s order by s.`order` asc limit 3';
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
	exports.getTopCards = getTopCards;
}());