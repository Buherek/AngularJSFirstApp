function ArchiwizerController($scope,$location,$timeout,$http,$filter,ServiceArchiwizer,ServiceArchiwizer2) {
	$scope.loadingList = true;
	$scope.list = null;
	$scope.filteredList = null;
	$scope.dateFromFiltr = null;
	$scope.dateToFiltr = null;
	$scope.numInvoiceFiltr = null;
	$scope.taxIdFiltr = null;
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.currentPageTmp = $scope.currentPage;
	$scope.predicate = "date";
	$scope.reverse = false;
	
	
		$scope.numberOfPages=function(){
			if($scope.filteredList==null || $scope.filteredList.length == 0){
				return 1;
			}
			return Math.ceil($scope.filteredList.length/$scope.pageSize);                
		}
		
		$scope.numberInvoice = function(){
			if($scope.filteredList == null) return 0;
			return $scope.filteredList.length;
		};
		
		$scope.startFrom = function() {
            return ($scope.currentPage - 1) * $scope.pageSize;
         };
		 
		 $scope.disableBefore = function(){
			return $scope.currentPage <= 1;
		 };
		 
		 $scope.disableNext = function(){
			if($scope.filteredList == null) return true;
			return $scope.currentPage > Math.ceil($scope.filteredList.length/$scope.pageSize);
		 };
		 
		 $scope.incrementCurrentPage = function(){
			if($scope.currentPage < Math.ceil($scope.filteredList.length/$scope.pageSize)){
				$scope.currentPage = $scope.currentPage + 1;
				$scope.currentPageTmp = $scope.currentPage;
			}
		 };
		 
		 $scope.decrementCurrentPage = function(){
			if($scope.currentPage > 1){
				$scope.currentPage = $scope.currentPage - 1;
				$scope.currentPageTmp = $scope.currentPage;
			}
		 };
		 
		 $scope.checkCurrentPage = function(){		 
			if($scope.currentPageTmp < 1 ){
				$scope.currentPage = 1;
				$scope.currentPageTmp = 1;
			}
			else{
				if($scope.currentPageTmp > Math.ceil($scope.filteredList.length/$scope.pageSize)){
					$scope.currentPageTmp = Math.ceil($scope.filteredList.length/$scope.pageSize);
					$scope.currentPage = $scope.currentPageTmp;				
				}
				else{
					$scope.currentPage = $scope.currentPageTmp;
				}
			}
		 };
		 
		 $scope.filtruj = function(){
			$scope.currentPage = 1;
			$scope.currentPageTmp = 1;
			$scope.filterList();
		};
		
		$scope.sortuj = function(predicate){
			$scope.setPredicateAndReverse(predicate);
			$scope.sortList();
		};
		$scope.setPredicateAndReverse = function(predicate){
			if(predicate == $scope.predicate){
				$scope.reverse = !$scope.reverse;
			}
			else{
				$scope.predicate = predicate;
				$scope.reverse = false;
			}
		};
		
		$scope.isPredicateAndReverse = function(predicate,reverse){
			return predicate != null && reverse!=null && predicate == $scope.predicate && reverse == $scope.reverse;
		};
		
		$scope.filterFunction = function(invoice){
			if($scope.dateFromFiltr != null && $scope.dateFromFiltr > invoice.data){
				return false;
			}
			if($scope.dateToFiltr != null && $scope.dateToFiltr < invoice.data){
				return false;
			}
			if($scope.taxIdFiltr != null && invoice.nip.indexOf($scope.taxIdFiltr)<0){
				return false;
			}
			if($scope.numInvoiceFiltr != null && invoice.numer.toString().indexOf($scope.numInvoiceFiltr)<0){
				return false;
			}
			return true			
		};
		
		$scope.filterList = function(){
			$scope.filteredList = $filter('filter')($scope.list,$scope.filterFunction);
		};
		
		$scope.sortList = function(){	
			$scope.filteredList = $filter('orderBy')($scope.filteredList,$scope.predicate,$scope.reverse);
		};
	
		$scope.getFile = function(){
			ServiceArchiwizer2.success(function(data) {
				$scope.list = data;
				$scope.filteredList = $scope.list;
				$scope.sortList();
			},function(data){
				console.log('error');
			});
		}
		
		$scope.getFile();
		
		$scope.reset = function(){
			$scope.dateFromFiltr = null;
			$scope.dateToFiltr = null;
			$scope.numInvoiceFiltr = null;
			$scope.taxIdFiltr = null;
			$scope.filtruj();
		};
		
		$scope.saveFile = function(url,nazwa){
			var event = document.createEvent("Event");
			event.initEvent("saveFileEvent", true, true);
			event.url = url;
			event.nazwa = nazwa;
			window.dispatchEvent(event);
		}
		
		$scope.viewFile = function(url){
			var event = document.createEvent("Event");
			event.initEvent("viewFileEvent", true, true);
			event.url = url;
			window.dispatchEvent(event);
		}
		
		
		
		
};
ArchiwizerController.$inject = ['$scope','$location','$timeout','$http','$filter','ServiceArchiwizer','ServiceArchiwizer2'];
