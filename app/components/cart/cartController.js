angular.module('cart.ngCart', ['ngCart'])

	.controller('NgCartController', ['$scope', '$http', 'ngCart', function ($scope, $http, ngCart) {
		console.log('cart controller');
		ngCart.setTaxRate(7.5);
		ngCart.setShipping(2.99);
	}]);