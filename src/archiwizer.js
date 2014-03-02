var apppp = angular.module( 'archiwizer',[]);

apppp.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
		if(input!=null && input != undefined){
			return input.slice(start);
		}
        return input;
    }
});
