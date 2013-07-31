// 'use strict';
var util = require('util');
var path = require('path');
var ClamLogo = require('../app/logo').ClamLogo;
var yeoman = require('yeoman-generator');
var ABC = require('abc-generator');
var exec = require('child_process').exec;
var	fs = require('fs');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
	// yeoman.generators.Base.apply(this, arguments);
	ABC.UIBase.apply(this, arguments);

	this.args = args;

    this.on('end', function () {
		console.log(this.gitpath);
		if(isGitPath(this.gitpath)){
			exec('git clone ' + this.gitpath);
			// TODO 删除不好使
			fs.unlinkSync(path.resolve(process.cwd(),getGitName(this.gitpath),'.git'));
			console.log(path.resolve(process.cwd(),getGitName(this.gitpath),'.git'));
			console.log(green('done!'));
		} else {
			console.log(yellow('git path is not correct!!'));
		}
    }.bind(this));

};

util.inherits(AppGenerator, ABC.UIBase);

AppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	
    // welcome message
	console.log(ClamLogo(this));

	this.gitpath = '';

	var prompts = [{
			name: 'git_path',
			message: 'Git Path?',
			default: '',
			waring:''
		}
	];

	if(this.args.length >= 1){
		this.gitpath = this.args[0];
		cb();
	} else {
		this.prompt(prompts, function (err, props) {
			if (err) {
				return this.emit('error', err);
			}

			this.gitpath= props.git_path;

			if(this.gitpath == ''){
				console.log(yellow('please input "Git Path"'));
				process.exit();
			}

			cb();
		}.bind(this));

	}
	// console.log(this.gitpath);
	// this.invoke('kissy-gallery');

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

function isGitPath(gitpath){
	var m = gitpath.match(/\/([^\/]+)\.git/);
	if(!m instanceof Array || m == null){
		return false;
	} else if(m.length < 2) {
		return false;
	} else {
		return true;
	}
}

function getGitName(gitpath){
	var m = gitpath.match(/\/([^\/]+)\.git/);
	return m.length >= 2 ? m[1] : '';
}
