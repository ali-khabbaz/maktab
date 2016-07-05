(function () {
	var showDb = require('../utilities.js').showDb,
		encryptor2 = require('../utilities.js').encryptor2,
		createToken = require('../utilities.js').createToken,
		//jwt = require('../requires.js').jwt,
		q = require('../utilities.js').q;

	function register(req, res, next) {
		console.log('>>>>>register:', req.body);


		passport.authenticate('local-register', function (err, user) {
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



		/*user.email = req.body.user;
		user.password = req.body.password;*/
		/*var query = "INSERT INTO users (`email`, `password`) VALUES ( '" + user.email + "' , " +
			" '" + user.password + "' )";
		showDb(query).then(function (ress) {
			console.log('query is', query);
			
			user.id = 56690;
			
			var token = createToken(user,req);
			res.send({
				user: user.email,
				token: token
			});
		}).fail(function (err) {
			console.log('');
			res.send('Errrrrrrrrrrrr : ', err);
		});*/
	}
	exports.register = register;
}());