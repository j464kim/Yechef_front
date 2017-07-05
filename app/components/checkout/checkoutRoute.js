'use strict';

angular.module('checkout', [
	'checkout.billing',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('checkout', {
				url: '/checkout',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('checkout.billing', {
				url: '/billing/{amount}',
				templateUrl: 'components/checkout/billingInformation.html',
				controller: 'CheckoutController as coCtrl'
			})

	});
