var app = angular.module('myapp',[]);

app.directive('rectangle', function($compile){
	return{
		// template:"
			// <div>
				// <rectangle id="rec" counter="5"><rectangle>
				// <button id="cntr">remove</button>
			// </div>
		// "
		// scope:{
			// fn:'$'
		// }
		// link:{
			// pre: function(scope,elem,attrs){
				// document.getElementById('btn').addEventListener('click',function(){
					// document.getElementById('rec').innerHTML = "4";
					// $compile(attrs.contents())(scope);
				// });
			// }
		// }
	// };
        template : `
					<div ng-repeat="value in rec" style="width:500px;height:100px;border:1px solid #000;">
						Rectangle {{value}}<br>
						<button id="btn">remove</button>
					</div>`,
		link: function(scope, elem, attrs){
			scope.rec = [];
			for(var i = 1; i <= attrs.number; i++){
				scope.rec.push(i);
			}
			jQuery(document).on('click','button',function(){
				jQuery(this).parent().remove();
			});
		}
		
	};
});