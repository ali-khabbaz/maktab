(function () {
	'use strict';
	var express = require('express'),
		env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
		app = express(),
		//session = require('express-session'),
		q = require('q'),
		request = require('request'),
		logger = require('morgan'),
		cookieParser = require('cookie-parser'),
		bodyParser = require('body-parser'),
		path = require('path'),
		cluster = require('cluster'),
		numCPUs = require('os').cpus().length,
		util = require('util'),
		bcrypt = require('bcrypt-nodejs'),
		crypto = require('crypto'),
		Client = require('mariasql'),
		jwt = require('jwt-simple'),
		sess,
		passport = require('passport'),
		localStrategy = require('passport-local').Strategy,
		c = new Client();


	exports.app = app;
	exports.express = express;
	///exports.session = session;
	exports.q = q;
	exports.env = env;
	exports.logger = logger;
	exports.cookieParser = cookieParser;
	exports.bodyParser = bodyParser;
	exports.path = path;
	exports.sess = sess;
	exports.cluster = cluster;
	exports.numCPUs = numCPUs;
	exports.util = util;
	exports.c = c;
	exports.bcrypt = bcrypt;
	exports.crypto = crypto;
	exports.jwt = jwt;
	exports.request = request;
	exports.passport = passport;
	exports.localStrategy = localStrategy;

}());