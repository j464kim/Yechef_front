'use strict';

angular.module('profile', [
	'user',
	'user.profile',
	'user.profile.general',
	'user.profile.subscribe'
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user.profile', {
				url: '/profile/{id}',
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
			})
			.state('user.profile.forked', {
				url: '/forked',
				templateUrl: 'components/users/profile/fork/userFork.html',
			})
			.state('user.profile.subscribe', {
				url: '/subscription',
				templateUrl: 'components/users/profile/subscription/userSubscribe.html',
				controller: 'UserSubscribeController as usCtrl',
			})
			.state('user.profile.privacySetting', {
				url: '/privacySetting',
				templateUrl: 'components/users/profile/privacy/userPrivacy.html',
			})
			.state('user.profile.payment', {
				url: '/payment',
				abstract: true,
				template: '<ui-view/>',
			})
			.state('user.profile.payment.list', {
				url: '/list',
				templateUrl: 'components/users/profile/payment/userPaymentList.html',
			})
			.state('user.profile.payment.create', {
				url: '/create',
				templateUrl: 'components/users/profile/payment/userPaymentCreate.html',
			})
			.state('user.profile.payment.edit', {
				url: '/edit',
				templateUrl: 'components/users/profile/payment/userPaymentEdit.html',
			});
	});
