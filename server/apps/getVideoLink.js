(function () {
	'use strict';
	var showDb = require('../utilities.js').showDb,
		request = require('../requires.js').request,
		q = require('../requires.js').q;

	function getVideoLink(req, res) {
		console.log('getVideoLink----', req.body);
		request({
				uri: req.body.link,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				method: 'head'
			},
			function (error, response, body) {
				res.send({
					link: response.socket._httpMessage._header.split('referer: ')[1]
						.split('host')[0]
				});
				return;
				// console.log(response.socket._httpMessage._header.split('referer: ')[1]
				// 	.split('host')[0]);
			});
	}
	exports.getVideoLink = getVideoLink;
}());
