
var fs = require('fs');

function info(){
	var help = readStr(__dirname + '/help.txt');
	console.log(help);
}

function readStr(file){
	var data = fs.readFileSync(file,{
		encoding:'utf8',
		flag:'r'	
	});
	return data;
}

exports.info = info;

// info();
