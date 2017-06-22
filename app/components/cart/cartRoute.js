'use strict';

angular.module('cart', [
	'cart.create'
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