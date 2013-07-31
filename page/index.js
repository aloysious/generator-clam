// 'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ClamLogo = require('../app/logo').ClamLogo;
var ABC = require('abc-generator');

var ClamGenerator = module.exports = function ClamGenerator(args, options, config) {
	ABC.UIBase.apply(this, arguments);
	//this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function () {
		console.log(green('done!'));
    }.bind(this));
};

util.inherits(ClamGenerator, ABC.UIBase);

ClamGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

    // welcome message
	console.log(ClamLogo(this));

    var prompts = [
        {
            name: 'pageName',
            message: 'Page Name?',
            default: 'page-name',
            warning: ''
        }
	];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }
        this.pageName = props.pageName; 
		cb();
    }.bind(this));
};

ClamGenerator.prototype.copyPage = function packageJSON() {
    this.template('index.html', this.pageName + '.html');
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
