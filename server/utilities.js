(function () {
	'use strict';
	var q = require('./requires.js').q,
		crypto = require('./requires.js').crypto,
		jwt = require('./requires.js').jwt;

	function showDb(myquery) {
		var dfd = q.defer(),
			result = [];
		c.query(myquery).on('result', function (res) {
			res.on('row', function (row) {
				result.push(row);
			}).on('error', function (err) {
				dfd.reject(new Error(err));
			}).on('end', function () {});
		}).on('end', function () {
			dfd.resolve(result);
		});
		return dfd.promise;
	}

	function showDbNew(c, myquery) {
		var dfd = q.defer();
		c.query(myquery, function (err, rows) {
			if(err) {
				dfd.resolve([err]);
			} else {
				dfd.resolve([null, rows]);
			}
		});
		return dfd.promise;
	}

	/*function encryptor(str) {
		console.log('str is', str);
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return err;
			}
			bcrypt.hash(str, salt, null, function (err, hash) {
				if (err) {
					return err;
				}
				console.log('str is', hash);
				return hash;
			});
		});
	}*/

	function encryptor2(str) {
		var algorithm = 'aes-256-gcm',
			password = str,
			cipher = crypto.createCipher(algorithm, password),
			crypted = cipher.update(str, 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	}

	function encode(payload, secret) {
		var algorithm = 'HS256',
			header = {
				typ: 'JWT',
				alg: algorithm
			},
			jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
		return jwt + '.' + sign(jwt, secret);
	}

	function decode(token) {
		var segments = token.split('.');
		if(segments.length !== 3) {
			throw new Error('token structure incorrect');
		}

		var rawSignature = segments[0] + '.' + segments[1];

		if(!verify(rawSignature, 'shh...', segments[2])) {
			throw new Error('verification failed');
		}
		var payload = JSON.parse(base64Decode(segments[1]));
		return payload;
	}

	function base64Encode(str) {
		return Buffer(str).toString('base64');
	}

	function base64Decode(str) {
		return new Buffer(str, 'base64').toString();
	}

	function sign(str, key) {
		return crypto.createHmac('sha256', key).update(str).digest('base64');
	}

	function verify(raw, secret, signature) {
		return signature === sign(raw, secret);
	}

	function createToken(user, req) {
		var payload = {
			iss: req.hostname,
			sub: user.id
		};
		return jwt.encode(payload, 'shh...');
	}

	exports.showDb = showDb;
	exports.showDbNew = showDbNew;
	exports.encryptor2 = encryptor2;
	exports.encode = encode;
	exports.decode = decode;
	exports.createToken = createToken;
}());
