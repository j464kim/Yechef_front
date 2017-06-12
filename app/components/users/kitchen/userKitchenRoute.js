'use strict';

angular.module('userKitchen', [
	'user',
	'user.kitchen',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user.kitchen', {
				url: '/kitchen/{myCurrentKitchenId}',
				params: {myCurrentKitchen: ''},
				templateUrl: 'components/users/kitchen/userKitchen.html',
			})
			.state('user.kitchen.dashboard', {
				url: '/dasborad',
				templateUrl: 'components/users/kitchen/dashboard/kitchenDashboard.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.general', {
				url: '/general',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.kitchen.general.view', {
				url: '/view',
				templateUrl: 'components/users/kitchen/general/kitchenGeneral.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.general.edit', {
				url: '/myKitchen/edit',
				templateUrl: 'components/users/kitchen/general/myKitchenEdit.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.dish', {
				url: '/dish',
				templateUrl: 'components/users/kitchen/dish/kitchenDish.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.order', {
				url: '/order',
				templateUrl: 'components/users/kitchen/order/kitchenOrder.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.subscriber', {
				url: '/subscriber',
				templateUrl: 'components/users/kitchen/subscriber/kitchenSubscriber.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.payout', {
				url: '/payout',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.kitchen.payout.view', {
				url: '/view',
				templateUrl: 'components/users/kitchen/payout/kitchenPayout.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.payout.preference', {
				url: '/view',
				templateUrl: 'components/users/kitchen/payout/payoutPreference.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.payout.setting', {
				url: '/setting',
				abstract: true,
				templateUrl: 'components/users/kitchen/payout/payoutSetting.html',
				// controller: 'userKitchenController as userKitchenCtrl',
			})
			.state('user.kitchen.payout.setting.view', {
				url:'',
				views: {
					'paypal': {
						templateUrl: 'components/users/kitchen/payout/addPayPal.html',
					},
					'bankAccount': {
						templateUrl: 'components/users/kitchen/payout/addBankAccount.html',
					},
				}
			})
	});
