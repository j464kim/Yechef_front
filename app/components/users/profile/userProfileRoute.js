'use strict';

angular.module('profile', [
	'user',
	'user.profile',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user.profile', {
				url: '/profile',
				templateUrl: 'components/users/profile/userProfile.html',
			})
			.state('user.profile.main', {
				url: '/main',
				templateUrl: 'components/users/profile/partial/userMain.html',
			})
			.state('user.profile.info', {
				url: '/info',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.profile.info.view', {
				url: '/view',
				templateUrl: 'components/users/profile/partial/userInfoView.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.info.edit', {
				url: '/edit',
				templateUrl: 'components/users/profile/partial/userInfoEdit.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.order', {
				url: '/myOrder',
				templateUrl: 'components/users/profile/partial/userOrder.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.forked', {
				url: '/forked',
				templateUrl: 'components/users/profile/partial/userFork.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.subscribe', {
				url: '/subscribe',
				templateUrl: 'components/users/profile/partial/userSubscribe.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.privacySetting', {
				url: '/privacySetting',
				templateUrl: 'components/users/profile/partial/userPrivacy.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.payment', {
				url: '/payment',
				abstract: true,
				template: '<ui-view/>',
			})
			.state('user.profile.payment.list', {
				url: '/list',
				templateUrl: 'components/users/profile/partial/userPaymentList.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.payment.create', {
				url: '/create',
				templateUrl: 'components/users/profile/partial/userPaymentCreate.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.payment.edit', {
				url: '/edit',
				templateUrl: 'components/users/profile/partial/userPaymentEdit.html',
				controller: 'userMainController as userMainCtrl',
			});
	});
