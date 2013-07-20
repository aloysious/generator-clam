// 'use strict';
var util = require('util');
var fs = require('fs');
var path = require('path');
var ClamLogo = require('../app/logo').ClamLogo;
var ABC = require('abc-generator');
var http = require('http');
var flexCombo = require('flex-combo');
var paperboy = require('paperboy');

var AppGenerator = module.exports = function AppGenerator(args, options, config) {
	ABC.UIBase.apply(this, arguments);

	var pwd = process.cwd();

    this.on('end', function () {
		var that = this;
		var sName = '/' + this.dirName;
		eval('var obj = {"' + sName + '":"' + this.dirName + '"}');
		console.log('path to:' + green(this.dirName));
		var comboInst = flexCombo(process.cwd(), obj);
		http.createServer(function (req, res) {

			paperboy
				.deliver(that.dirName === "" ? ".":that.dirName, req, res)
				.before(function() {
				
				})
				.after(function(statCode) {
					log(statCode, req.url);
				})
				.error(function(statCode, msg) {
					log(statCode, req.url);
					res.writeHead(statCode, {'Content-Type': 'text/plain'});
					res.end("Error " + statCode);
				})
				.otherwise(function(err) {
					if(req.url.match(/.+\?\?.+/i)){
						log('combo', req.url);
					}
					comboInst(req, res, function(){

						if(isDir(pwd + req.url)){
							res.writeHead(200, {'Content-Type': 'text/html'});
							var r = getDirFiles(pwd + req.url);
							r += '<style>' +
								'p {'+
								'font-family:Tahoma;'+
								'font-size:12px;'+
								'line-height:12px;'+
								'margin:9px 10px'+
								'}'+
								'</style>';
							res.end(r);
						} else {
							log(404, req.url, 'Not found');
							res.writeHead(404, {'Content-Type': 'text/plain'});
							res.end("Error 404: "+req.url);
						}
					});
				});


		}).listen(this.port, '127.0.0.1');
		console.log('Flex Combo Server running at http://127.0.0.1:'+this.port+'/');
    }.bind(this));

};

util.inherits(AppGenerator, ABC.UIBase);

AppGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	
    // welcome message
	console.log(ClamLogo(this));

	var prompts = [{
			name: 'dirName',
			message: 'alias [dirName] to / ?',
			default: '',
			waring:''
		},
		{
			name: 'port',
			message: 'server Port?',
			default: '8888',
			waring:''
		}

	];

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err);
        }

        this.dirName = props.dirName ;
        this.port = props.port;

        cb();
    }.bind(this));
};

AppGenerator.prototype.files = function files(){

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

function log(statCode, url, err) {
  var logStr = blue(statCode) + ' - ' + url ;
  if (err)
    logStr += ' - ' + red(err);
  console.log(logStr);
}

function getDirFiles(dir){
	var files = fs.readdirSync(dir);
	var res_f = []; 
	var res_d = [];
	var r = '';
	files.forEach(function(file){
		var stat = fs.lstatSync(path.resolve(dir,file));

		if (!stat.isDirectory()){
			res_f.push(file);
		} else {
			res_d.push(file);
		}   
	});

	
	r += '<p><img src="http://img02.taobaocdn.com/tps/i2/T1WNlnFadjXXaSQP_X-16-16.png" /> <a href="../">parent dir</a></p><hr size=1 />';

	res_d.forEach(function(file){
		r += '<p><img src="http://img03.taobaocdn.com/tps/i3/T1nHRTFmNXXXaSQP_X-16-16.png" /> <a href="'+file+'/">'+file+'</a></p>';
	});

	res_f.forEach(function(file){
		r += '<p><img src="http://img02.taobaocdn.com/tps/i2/T1Y7tPFg8eXXaSQP_X-16-16.png" /> <a href="'+file+'">'+file+'</a></p>';
	});

	return r;
}

function isDir(dir){
	var stat = fs.lstatSync(dir);
	return stat.isDirectory();
}

