(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb,
		request = require('../requires.js').request,
		q = require('../requires.js').q;

	function getVideoLink(req, res) {
		request({
				uri: req.body.link,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				method: 'head'
			},
			function (error, response, body) {
				res.send({
					link: response.request.uri.href
				});
				return;
			});
	}
	exports.getVideoLink = getVideoLink;
}());
