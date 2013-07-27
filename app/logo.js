function ClamLogo(contex) {
	var version = '';
	try{
		version = contex? 'v'+contex.pkg.version : '';
	}
	catch (e){}
	var logo = 
'\n'+
red('  _____ _               __  __ \n')+
red(' / ____| |        /\\   |  \\/  |\n')+
yellow('| |    | |       /  \\  | \\  / |\n')+
green('| |    | |      / /\\ \\ | |\\/| |\n')+
purple('| |____| |____ / ____ \\| |  | |\n')+
blue(' \\_____|______/_/    \\_\\_|  |_|') + ' ' + version + '\n\n';

	logo += ('need help?')+ purple('  ===>  ') + green('yo clam:h') + '\n';

	if(contex){
		logo += '\nCMD: '+green(contex.generatorName.toUpperCase())+'\n';
	}

	return logo;
};

exports.ClamLogo = ClamLogo;

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

function purple(str){
	return consoleColor(str,36);
}

// console.log(ClamLogo());
