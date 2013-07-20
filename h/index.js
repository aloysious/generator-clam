// 'use strict';
var util = require('util');
var path = require('path');
var ClamLogo = require('../app/logo').ClamLogo;
var helper = require('./helper');
var ABC = require('abc-generator');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
	ABC.UIBase.apply(this, arguments);

    this.on('end', function () {
		//helper.info();
    }.bind(this));

};

util.inherits(AppGenerator, ABC.UIBase);

AppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	
    // welcome message
	// console.log(ClamLogo(this));
	helper.info();
};

