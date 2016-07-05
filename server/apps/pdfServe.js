(function () {
	function pdfServe(req, res) {
		res.download(__dirname + req.url);
	}
	exports.pdfServe = pdfServe;
}());