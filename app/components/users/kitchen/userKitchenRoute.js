
'use strict';

angular.module('userKitchen', [
	'user',
	'user.kitchen',
	'user.kitchen.general',
	'user.kitchen.dish',
	'user.kitchen.subscriber',
	'user.kitchen.order',

])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user.kitchen', {
				url: '/kitchen/{myCurrentKitchenId}',
				templateUrl: 'components/users/kitchen/userKitchen.html',
				controller: 'userKitchenController as UkCtrl',
			})
			.state('user.kitchen.dashboard', {
				url: '/dashboard',
				templateUrl: 'components/users/kitchen/dashboard/kitchenDashboard.html',
			})
			.state('user.kitchen.general', {
				url: '/general',
				abstract: true,
				template: '<ui-view/>',
				controller: 'userKitchenGeneralController as UkgCtrl',
			})
			.state('user.kitchen.general.view', {
				url: '/view',
				templateUrl: 'components/users/kitchen/general/kitchenGeneral.html',
			})
			.state('user.kitchen.general.edit', {
				url: '/myKitchen/edit',
				templateUrl: 'components/kitchens/update/kitchenUpdate.html',
			})
			.state('user.kitchen.dish', {
				url: '/dish',
				templateUrl: 'components/users/kitchen/dish/kitchenDish.html',
				controller: 'kitchenDishController as KdCtrl',
			})
			.state('user.kitchen.order', {
				url: '/order',
				templateUrl: 'components/users/kitchen/order/kitchenOrder.html',
				controller: 'KitchenOrderController as koCtrl',
			})
			.state('user.kitchen.subscriber', {
				url: '/subscriber',
				templateUrl: 'components/users/kitchen/subscriber/kitchenSubscriber.html',
				controller: 'kitchenSubscriberController as KsCtrl',
			})

	});
