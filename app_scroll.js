var app = angular.module('app',['infinite-scroll']);


app.value('busy', false);

app.controller('search_controller',function($scope, $http, $timeout){


	$scope.submit = function(){

		$scope.message = 'Searching Instagram for photos tagged with "' + $scope.tag + '".';

		var url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent';

		var request = {
      count: 9,
      callback: 'JSON_CALLBACK',
		  client_id: '7801b4ae0486431e9e81f5301fdcb006'};

		$http({url:url, params:request, method: 'JSONP'})
		.success(success)
		.error(error);

		function success(data, status, headers, config){
      $timeout(
        function(){
          $scope.message = 'Photos for "' + $scope.tag + '".';
        },
        1000);

      $scope.results = data.data;
      $scope.next_url = data.pagination.next_url;
    }
       
    function error(error, status, headers, config){
      $scope.message = 'There are some errors when processing your request.';
    } 

	};

  $scope.add_more = function(){

    if($scope.tag){

        busy = true;

        var url = $scope.next_url;
        var request = {
            count: 9,
            callback: 'JSON_CALLBACK',
            client_id: '7801b4ae0486431e9e81f5301fdcb006'
          };


        $http({url:url, params:request, method: 'JSONP'})
        .success(success)
        .error(error);

        function success(data, status, headers, config){
          $scope.add_results = data.data;
          for (var i = 0; i < $scope.add_results.length; i++) {
              $scope.results.push($scope.add_results[i]);
          }
          $scope.next_url = data.pagination.next_url;
          busy = false;
        }
       
        function error(error, status, headers, config){
            $scope.message = 'There are some errors when processing your request.';
            busy = false;
        } 

    }

  };


});