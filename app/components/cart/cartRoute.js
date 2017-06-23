'use strict';

angular.module('cart', [
	'cart.ngCart',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('cart', {
				url: '/cart',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('cart.view', {
				url: '/view',
				templateUrl: 'components/cart/showCart.html',
				controller: 'NgCartController as cartCtrl'
			})
	});
