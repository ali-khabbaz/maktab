(function () {
	var showDb = require('../utilities.js').showDb,
		passport = require('passport'),
		local_strategy = require('passport-local').Strategy,
		encryptor2 = require('../utilities.js').encryptor2,
		createToken = require('../utilities.js').createToken,
		q = require('../utilities.js').q;

	function login(req, res, next) {
		console.log('login hostname', req.hostname);

		passport.authenticate('local-login', function (err, user) {
			console.log('first', err, user);
			req.login(user, function (err) {
				if (err || !user) {
					console.log('another err', err);
					return res.status(401).send({
						message: 'username or password is wrong'
					});
				}
				var token = createToken(user, req);
				res.send({
					user: user.email,
					token: token
				});
				console.log('login result', user);
			});
		})(req, res, next);
	}

	exports.login = login;
}());