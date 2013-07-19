





function getBiggestVersion(A){
	var a = [];
	var b = [];
	var t = [];
	var r = [];
	for(var i= 0;i< A.length;i++){
		if(A[i].match(/^\d+\.\d+\.\d+$/)){
			var sp = A[i].split('.');
			a.push([
				Number(sp[0]),Number(sp[1]),Number(sp[2])
			]);
		}
	}
	
	var r = findMax(findMax(findMax(a,0),1),2);
	return r[0];
}

// a：二维数组，index，比较第几个
// return：返回保留比较后的结果组成的二维数组
function findMax(a,index){
	var t = [];
	var b = [];
	var r = [];
	for(var i = 0;i<a.length;i++){
		t.push(Number(a[i][index]));
	}
	var max = Math.max.apply(this,t);
	for(var i = 0;i<a.length;i++){
		if(a[i][index] === max){
			b.push(i);
		}
	}
	for(var i = 0;i<b.length;i++){
		r.push(a[b[i]]);
	}
	return r;
}

/*
console.log(getBiggestVersion([
	'1.2.3',
	'1.2.4',
	'1.3.4',
	'x.y.z',
	'1.35.2',
	'0.30.2',
	'2.0.1',
	'2.10.3',
	'2.8.2',
	'1.3.5'
]));
*/

var exec = require('child_process').exec;

exec('cd ~/trip/h5-test; git branch -a;git tag -l', function(err, stdout, stderr, cb) {

	console.log(stdout);
	console.log(stdout.match(/\d+\.\d+\.\d+/ig));
	console.log(getbiggestversion(stdout.match(/\d+\.\d+\.\d+/ig)));


	return ;
	var reg = /\*\s+daily\/(\s+)/,
		match = stdout.match(reg);

	if (!match) {
		return grunt.log.error('当前分支为 master 或者名字不合法(daily/x.y.z)，请切换分支'.red);
	}

	grunt.log.write(('当前分支：' + match[1]).green);

	grunt.config.set('currentbranch', match[1]);

	done();

});
