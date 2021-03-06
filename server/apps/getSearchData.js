/*jshint multistr: true */
(function () {
	'use strict';
	var c = require('../../server.js').c,
		showDbNew = require('../utilities.js').showDbNew,
		setCharset = require('../utilities.js').setCharset,
		q = require('../requires.js').q;

	function getSearchData(req, res) {
		setCharset(c);
		var funcs = [],
			query =
			'SELECT \
					  c.name categoryName, \
					  c.persian_name categoryPersianName, \
					  c.id, \
					  sc.name subcategoryName, \
					  sc.persian_name subcategoryPersianName, \
					  sc.category_id \
					FROM sub_category sc, \
					     category c \
					WHERE c.id = sc.category_id';
		//funcs.push(showDb(query));
		query = 'SELECT \
				  a.name, \
				  a.persian_name, \
				  a.id \
				FROM articles a';
		funcs.push(showDbNew(c, query));
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
	exports.getSearchData = getSearchData;
}());