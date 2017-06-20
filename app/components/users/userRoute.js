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
			.state('user.password', {
				url: '/password',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.password.resetRequest', {
				url: '/password/reset',
				templateUrl: 'components/users/password/resetRequest.html',
				controller: 'PasswordController as PasswordCtrl',
			})
			.state('user.password.updateRequest', {
				url: '/password/change',
				templateUrl: 'components/users/password/updateRequest.html',
				controller: 'PasswordController as PasswordCtrl',
			})
			.state('user.password.resetPassword', {
				url: '/password/reset/{token}',
				templateUrl: 'components/users/password/resetPassword.html',
				controller: 'PasswordController as PasswordCtrl',
			});
	});