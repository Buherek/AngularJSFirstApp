apppp.factory('ServiceArchiwizer', ['$http',
                                                 function($http) {
    return $http.get("../data/pl.json");
}]);

apppp.factory('ServiceArchiwizer2', ['$http',
                                                function($http) {												
    return $http.get('http://simple.localhost:8080/simple/rest/dokumentyResource');
}]);
