var app = angular.module('app',[]);

app.controller('search_controller',function($scope, $http){


    $scope.search_success=false;
    $scope.fail = false;
    $scope.doing_searching = false;

  function wait() {
    return $q(function(resolve, reject){
      $timeout(function() {
        resolve();
      }, 2000);
    });
  }

	$scope.submit = function(){

		$scope.doing_searching = true;

		var url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent';

		var request = {callback: 'JSON_CALLBACK',
		              client_id: '7801b4ae0486431e9e81f5301fdcb006'};

		$http({url:url, params:request, method: 'JSONP'})
		.success(success)
		.error(error);

		function success(data, status, headers, config){

		  $scope.search_success=true;
          $scope.results = data.data;
         
        }
       function error(error, status, headers, config){
       	$scope.fail = true;
        }


	}
});