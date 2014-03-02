apppp.directive('datepicker', function() {
	  return {
		    link: function(scope, el, attr) {
		      $(el).datepicker({
		        dateFormat: 'yy-mm-dd',
		        onSelect: function(dateText) {
		          var expression = attr.ngModel + " = " + "'" + dateText + "'";
		          scope.$apply(expression);
		        }
		      });
		    }
		  };
});
