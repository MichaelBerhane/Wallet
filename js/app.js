var myApp = angular.module('wallet', [
	'ngRoute',
	'appControllers'
]);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/home', {
			templateUrl: 'partials/landing.html'
		}).
    when('/wallet', {
      templateUrl: 'partials/wallet.html'
    }).
		otherwise({
			redirectTo: '/home'
		});
}]);
