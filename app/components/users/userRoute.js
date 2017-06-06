'use strict';

angular.module('user', [
	'user.login',
	'user.register',
	'user.profile',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user', {
				url: '/user',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.login', {
				url: 'login',
				templateUrl: 'components/users/login/template.html',
				controller: 'UserLoginController as LoginCtrl',
			})
			.state('user.register', {
				url: '/register',
				templateUrl: 'components/users/register/template.html',
				controller: 'UserRegisterController as RegisterCtrl',
			})
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
				templateUrl: 'components/users/profile/partial/userInfo.html',
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
				templateUrl: 'components/users/profile/partial/userPayment.html',
				controller: 'userMainController as userMainCtrl',
			})
			.state('user.profile.payout', {
				url: '/payout',
				templateUrl: 'components/users/profile/partial/userPayout.html',
				controller: 'userMainController as userMainCtrl',
			});
	});
