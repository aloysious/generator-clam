/**
 * @fileoverview <%= projectName %> - <%= modName %>.
 * @author 
 */
/**
 * KISSY.use('<%= packageName %>/<%= mojoName %>/index',function(S,<%= modName %>){
 *		new <%= modName %>();
 * });
 */
KISSY.add(function(S,RichBase) {

	var <%= modName %> = RichBase.extend({
		initializer:function(){
			var self = this;

			// Your Code
			alert('ok');
		}
	},{
		ATTRS: {
			A:{
				value:'abc'
			}
		}
	});

	return <%= modName %>;
	
},{
	requires:['rich-base']	
});
