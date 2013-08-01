
/*
 * http://g.tbcdn.cn/<%= groupName %>/<%= packageName %>/<%= version %>/config.js
 **/
(function(){
	if (KISSY.Config.debug) {
		var srcPath = "<%= srcPath %>";
		KISSY.config({
			packages:[
				{
					name:"<%= packageName %>",
					path:srcPath,
					charset:"utf-8",
					ignorePackageNameInUri:true,
					debug:true
				}
			]
		});
	} else {
		KISSY.config({
			packages: [
				{
					name: '<%= packageName %>',
					// 发布到线上时需要带上版本号
					path: 'http://g.tbcdn.cn/<%= groupName %>/<%= packageName %>/<%= version %>',
					ignorePackageNameInUri: true
				}
			]
		});
	}
})();
