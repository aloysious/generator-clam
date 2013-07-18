'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ABC = require('abc-generator');

var ClamGenerator = module.exports = function ClamGenerator(args, options, config) {
	// yeoman.generators.Base.apply(this, arguments);
	ABC.UIBase.apply(this, arguments);
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function () {
        this.prompt([{
            name: 'initPage',
            message: 'Do you add a page right now?',
            default: 'Y/n',
            warning: ''
        }], function (err, props) {

            if (err) {
                return this.emit('error', err);
            }

            this.initPage = (/y/i).test(props.initPage);

            if (this.initPage) {
                this.invoke('clam page')
            }

        }.bind(this));

    }.bind(this));

};

util.inherits(ClamGenerator, ABC.UIBase);

ClamGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

    // welcome message
    this.log(this.abcLogo);

    var abcJSON = {};
    try {
        abcJSON = require(path.resolve(process.cwd(), 'abc.json'));
    } catch (e) {
    }
    if (!abcJSON.author) {
        abcJSON.author = {
            name: '',
            email: ''
        }
    }

  // have Yeoman greet the user.
  // console.log(this.yeoman);

	var prompts = [{
			name: 'projectName',
			message: 'Name of Project?',
			default: path.basename(process.cwd()),
			waring:''
		},
        {
            name: 'author',
            message: 'Author Name:',
            default: abcJSON.author.name,
            warning: ''
        },
        {
            name: 'email',
            message: 'Author Email:',
            default: abcJSON.author.email,
            warning: ''
        }
	];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

        this.projectName = props.projectName;
        this.author = props.author;
        this.email = props.email;

        cb();
    }.bind(this));
};

ClamGenerator.prototype.app = function app() {
  //this.mkdir('app');
  //this.mkdir('app/templates');

  //this.copy('_package.json', 'package.json');
  //this.copy('_bower.json', 'bower.json');
};

ClamGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

ClamGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

ClamGenerator.prototype.git = function git() {
    this.copy('_gitignore', '.gitignore');
};

ClamGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

ClamGenerator.prototype.app = function app() {
    this.mkdir('build');
	this.mkdir('doc');
    this.copy('README.md', 'README.md');
    this.template('abc.json');
    this.template('index.js');
    this.template('index.css');
    this.template('index.html');
};
ClamGenerator.prototype.install = function install() {
	return;
    var cb = this.async();
    this.npmInstall('', {}, function (err) {

        if (err) {
            return console.log('error', err);
        }

        console.log('\n\nnpm was installed successful. \n\n');

    });
};
