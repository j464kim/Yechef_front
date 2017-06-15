'use strict';

angular.module('user', [
	'user.login',
	'user.register',
	'user.password',
])

	.config(function ($stateProvider) {

		$stateProvider
			.state('user', {
				url: '/user',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.login', {
				url: '/login',
				templateUrl: 'components/users/login/template.html',
				controller: 'UserLoginController as LoginCtrl',
			})
			.state('user.register', {
				url: '/register',
				templateUrl: 'components/users/register/template.html',
				controller: 'UserRegisterController as RegisterCtrl',
			})
			.state('user.linkRequest', {
				url: '/password/reset',
				templateUrl: 'components/users/password/linkRequest.html',
				controller: 'PasswordController as PasswordCtrl',
			})
			.state('user.resetPassword', {
				url: '/password/reset/{token}',
				templateUrl: 'components/users/password/resetPassword.html',
				controller: 'PasswordController as PasswordCtrl',
			});
	});