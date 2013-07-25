// 'use strict';
var util = require('util');
var path = require('path');
var ClamLogo = require('../app/logo').ClamLogo;
var yeoman = require('yeoman-generator');
var ABC = require('abc-generator');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
	// yeoman.generators.Base.apply(this, arguments);
	ABC.UIBase.apply(this, arguments);

    this.on('end', function () {
		console.log(green('done!'));
    }.bind(this));

};

util.inherits(AppGenerator, ABC.UIBase);

AppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	
    // welcome message
	console.log(ClamLogo(this));

	this.invoke('kissy-gallery');

};

function consoleColor(str,num){
	if (!num) {
		num = '32';
	}
	return "\033[" + num +"m" + str + "\033[0m"
}

function green(str){
	return consoleColor(str,32);
}

function yellow(str){
	return consoleColor(str,33);
}

function red(str){
	return consoleColor(str,31);
}

function blue(str){
	return consoleColor(str,34);
}
