
var fs = require('fs');

function info(){
	var help = readStr('./help.txt');
	console.log(help);
}

function readStr(file){
	var bf = fs.readFileSync(file);
	var tmp_file = __dirname + '/utf-tf';
	fs.writeFileSync(tmp_file,bf,'utf8');
	var data = fs.readFileSync(tmp_file,'utf-8');
	fs.unlink(tmp_file);
	return data;
}

exports.info = info;

// info();
