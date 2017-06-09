'use strict';

angular.module('userKitchen', [
	'user',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user.kitchen', {
				url: '/kitchen',
				templateUrl: 'components/users/kitchen/userKitchen.html',
			})
			.state('user.kitchen.dashboard', {
				url: '/dasborad',
				templateUrl: 'components/users/kitchen/dashboard/kitchenDashboard.html',
			})
			.state('user.kitchen.general', {
				url: '/general',
				templateUrl: 'components/users/kitchen/general/kitchenGeneral.html',
			})
			.state('user.kitchen.dish', {
				url: '/dish',
				templateUrl: 'components/users/kitchen/dish/kitchenDish.html',
			})
			.state('user.kitchen.order', {
				url: '/order',
				templateUrl: 'components/users/kitchen/order/kitchenOrder.html',
			})
			.state('user.kitchen.subscriber', {
				url: '/subscriber',
				templateUrl: 'components/users/kitchen/subscriber/kitchenSubscriber.html',
			})
			.state('user.kitchen.payout', {
				url: '/payout',
				templateUrl: 'components/users/kitchen/payout/kitchenPayout.html',
			})
	});
