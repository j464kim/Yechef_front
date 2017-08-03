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
				url: '/method',
				abstract: true,
				templateUrl: 'components/checkout/selectPayment.html',
				controller: 'CheckoutController as coCtrl',
				params: {
					'amount': null,
					'kitchenId': null
				}
			})
			.state('checkout.billing.select', {
				url: '',
				views: {
					'default': {
						templateUrl: 'components/checkout/defaultCard.html',
					},
					'new': {
						templateUrl: 'components/checkout/newCard.html',
					}
				}
			})

	});
