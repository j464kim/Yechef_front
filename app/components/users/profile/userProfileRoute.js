'use strict';

angular.module('profile', [
	'user',
	'user.profile',
	'user.profile.general',
	'user.profile.subscribe',
	'user.profile.fork',
	'user.profile.privacy',
	'user.profile.order',
	'user.profile.payment',
	'user.profile.payment.create',
	'user.profile.payment.update',
	'user.profile.payout.list',
	'user.profile.payout.create'
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user.profile', {
				url: '/profile',
				templateUrl: 'components/users/profile/userProfile.html',
			})
			.state('user.profile.main', {
				url: '/main',
				templateUrl: 'components/users/profile/main/userMain.html',
			})
			.state('user.profile.info', {
				url: '/info',
				abstract: true,
				template: '<ui-view/>',
			})
			.state('user.profile.info.view', {
				url: '',
				templateUrl: 'components/users/profile/general/userInfoView.html',
				controller: 'UserGeneralController as ugCtrl',
			})
			.state('user.profile.info.edit', {
				url: '/edit',
				templateUrl: 'components/users/profile/general/userInfoEdit.html',
				controller: 'UserGeneralController as ugCtrl',
			})
			.state('user.profile.order', {
				url: '/myOrder',
				templateUrl: 'components/users/profile/order/userOrder.html',
				controller: 'UserOrderController as uoCtrl',
			})
			.state('user.profile.forked', {
				url: '/forked',
				templateUrl: 'components/users/profile/fork/userFork.html',
				controller: 'UserForkController as ufCtrl',
			})
			.state('user.profile.subscribe', {
				url: '/subscription',
				templateUrl: 'components/users/profile/subscription/userSubscribe.html',
				controller: 'UserSubscribeController as usCtrl',
			})
			.state('user.profile.privacySetting', {
				url: '/privacySetting',
				templateUrl: 'components/users/profile/privacy/userPrivacy.html',
				controller: 'UserPrivacyController as upCtrl',
			})
			.state('user.profile.payment', {
				url: '/payment',
				abstract: true,
				template: '<ui-view/>',
			})
			.state('user.profile.payment.list', {
				url: '/list',
				templateUrl: 'components/users/profile/payment/list/paymentList.html',
				controller: 'PaymentListController as plCtrl',
			})
			.state('user.profile.payment.create', {
				url: '/create',
				templateUrl: 'components/users/profile/payment/create/paymentCreate.html',
				controller: 'PaymentCreateController as pcCtrl',
			})
			.state('user.profile.payment.edit', {
				url: '/edit/{index}',
				templateUrl: 'components/users/profile/payment/update/paymentUpdate.html',
				controller: 'PaymentUpdateController as puCtrl',
			})
			.state('user.profile.payout', {
				url: '/payout',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.profile.payout.list', {
				url: '/view',
				templateUrl: 'components/users/profile/payout/list/userPayoutList.html',
				controller: 'PayoutListController as plCtrl',
			})
			.state('user.profile.payout.update', {
				url: '/update',
				abstract: true,
				template: '<ui-view/>',
			})
			.state('user.profile.payout.update.address', {
				url: '',
				templateUrl: 'components/users/profile/payout/update/updateAddress.html',
				controller: 'PayoutListController as plCtrl',
			})
			.state('user.profile.payout.preference', {
				url: '/view',
				templateUrl: 'components/users/profile/payout/payoutPreference.html',
			})
			.state('user.profile.payout.new', {
				url: '/new',
				abstract: true,
				template: '<ui-view/>',
				controller: 'PayoutCreateController as pcCtrl',
			})
			.state('user.profile.payout.new.address', {
				url: '/address',
				templateUrl: 'components/users/profile/payout/create/enterAddress.html',
			})
			.state('user.profile.payout.new.method', {
				url: '/method',
				abstract: true,
				templateUrl: 'components/users/profile/payout/create/selectMethod.html',
			})
			.state('user.profile.payout.new.method.select', {
				url: '',
				views: {
					'paypal': {
						templateUrl: 'components/users/profile/payout/create/addPayPal.html',
					},
					'bankAccount': {
						templateUrl: 'components/users/profile/payout/create/addBankAccount.html',
					},
				}
			})
	});
