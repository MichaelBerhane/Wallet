var myApp = angular.module('myApp', [
	'ngRoute',
	'appControllers'
]);


/* Routes */


myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/home', {
			templateUrl: 'partials/landing.html'
		}).
    when('/wallet', {
      templateUrl: 'partials/wallet.html',
      controller: 'WalletController',
      controller: 'ListController'
    }).
		otherwise({
			redirectTo: '/home'
		});
}]);
