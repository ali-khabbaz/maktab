var Client = require('mariasql');

var c = new Client({
	host: '127.0.0.1',
	user: 'root',
	password: 'bahbah',
	db: '13950630'
});

/*var query = c.query('SET NAMES \'utf8\'');
query.on('result', function (res) {
	// `res` is a streams2+ Readable object stream
	res.on('data', function (row) {
		console.dir(row);
	}).on('end', function () {
		console.log('Result set finished');

	});
}).on('end', function () {
	console.log('No more result sets!');

});*/

c.query('SET NAMES \'utf8\'', function (err, rows) {
	if (err)
		throw err;
	console.dir(rows);
});

c.query('select * from category', function (err, rows) {
	if (err)
		throw err;
	console.dir(rows);
});



c.end();