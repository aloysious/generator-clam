/**
 * @fileoverview <%= projectName %> - <%= mojoName %>.
 * @author 
 */
/**
 * KISSY.use('<%= projectName %>/<%= mojoName %>/index',function(S,<%= mojoName %>){
 *		<%= mojoName %>.init();
 * });
 */
KISSY.add(function(S,RichBase) {

	var <%= mojoName %> = RichBase.extend({
		initializer:function(){
			var self = this;

			// Your Init Code
			alert('ok');
		}
	},{
		ATTRS: {
			A:{
				value:'abc'
			}
		}
	});

	return <%= mojoName %>;
	
},{
	requires:['rich-base']	
});
