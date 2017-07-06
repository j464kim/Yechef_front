'use strict';

angular.module('cart', [
	'cart.api',
	'ngCart',
	'ngCart.directives',
	'ngCart.fulfilment',
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
			})
	});
