var app = angular.module('app',[]);

app.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('search_controller',function($scope, $http, $timeout){


	$scope.submit = function(){

		$scope.message = 'Searching Instagram for photos tagged with "' + $scope.tag + '".';

		var url = 'https://api.instagram.com/v1/tags/' + $scope.tag + '/media/recent';

		var request = {
      count: 21,
      callback: 'JSON_CALLBACK',
		  client_id: '7801b4ae0486431e9e81f5301fdcb006'};

		$http({url:url, params:request, method: 'JSONP'})
		.success(success)
		.error(error);

		function success(data, status, headers, config){
      $timeout(
        $scope.message = 'We found ' + data.data.length + ' results for "' + $scope.tag + '".',
        1000);
      $scope.results = data.data;
    }
       
    function error(error, status, headers, config){
      $scope.message = 'There are some errors when processing your request.';
    } 

	};


});