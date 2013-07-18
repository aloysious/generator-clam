// 'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ABC = require('abc-generator');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
	// yeoman.generators.Base.apply(this, arguments);
	ABC.UIBase.apply(this, arguments);
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function () {
		console.log(green('done!'));
    }.bind(this));

};

util.inherits(AppGenerator, ABC.UIBase);

AppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	
	try {
		abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
		this.projectName = abcJSON.name;
	} catch (e) {}


    // welcome message
    this.log(this.abcLogo);

	var prompts = [{
			name: 'mojoName',
			message: 'Name of Module?',
			default: 'your-mojo-name',
			waring:''
		}
	];

	// your-mojo-name => YourMojoName
	function parseMojoName(name){
		return name.replace(/\b(\w)|(-\w)/g,function(m){
			return m.toUpperCase().replace('-','');
		});
	}

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

		var _tname = props.mojoName;

        this.mojoName = props.mojoName;// your-mod-name
		this.modName = parseMojoName(this.mojoName);//YourModName
		this.projectName = abcJSON.name;//Abc
		this.packageName = this.projectName.toLowerCase(); //abc

        cb();
    }.bind(this));
};

AppGenerator.prototype.files = function files(){
	this.mkdir(this.mojoName);
	this.mkdir(this.mojoName+'/img');
    this.template('index.html',this.mojoName+'/index.html');
    this.template('index.js',this.mojoName+'/index.js');
    this.template('index.css',this.mojoName+'/index.css');
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
