// 'use strict';
var util = require('util');
var path = require('path');
var ClamLogo = require('../app/logo').ClamLogo;
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
	
	var modsPagesWidgets = false;

	try {
		abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
	} catch (e) {
		console.log('abc.json not found');
		try {
			abcJSON = require(path.resolve(process.cwd(),'..', 'abc.json'));
		} catch(e){
			try {
				abcJSON = require(path.resolve(process.cwd(),'../../', 'abc.json'));
				modsPagesWidgets = path.basename(process.cwd());
			} catch(e){
				console.log('do nothing!');
				process.exit();
			}
		}
	}

    if (!abcJSON.author) {
        abcJSON.author = {
            name: '',
            email: ''
        }
    }

	if(!abcJSON.name){
		abcJSON.name = 'tmp';
	}

	if(!abcJSON.group){
		abcJSON.group = 'groupName';
	}

	this.modsPagesWidgets = modsPagesWidgets;
	this.projectName = abcJSON.name;

    // welcome message
	console.log(ClamLogo(this));

	var prompts = [{
			name: 'mojoName',
			message: 'Name of Module?',
			default: 'your-mojo-name',
			waring:''
		}
	];

	// your-mojo-name => YourMojoName
	function parseName(name){
		return name.replace(/\b(\w)|(-\w)/g,function(m){
			return m.toUpperCase().replace('-','');
		});
	}

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

		var _tname = props.mojoName;

        this.mojoName = this.modsPagesWidgets? this.modsPagesWidgets + '/' + props.mojoName : props.mojoName;// your-mod-name
		this.modName = parseName(_tname);//YourModName
		this.packageName = abcJSON.name;// package-name
        this.groupName = abcJSON.group;
		this.config = abcJSON.config;
		this.projectName = parseName(this.packageName); //PackageName
		this.srcPath = this.modsPagesWidgets? '../../' : '../';

        cb();
    }.bind(this));
};

AppGenerator.prototype.files = function files(){
	// 如果有mods/widgets/pages，就把前缀替换回来
	var mojoName = this.modsPagesWidgets? this.mojoName.replace(/^([^\/]+)\//i,'') : this.mojoName;
	this.mkdir(mojoName);
	this.mkdir(mojoName+'/img');
    this.template('index.html',mojoName + '/index.html');
    this.template('index.js',mojoName+'/index.js');
    this.template('index.css',mojoName+'/index.css');
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
