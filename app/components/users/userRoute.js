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
				templateUrl: 'components/users/login/login.html',
				controller: 'LoginController as LoginCtrl',
			})
			.state('user.register', {
				url: '/register',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.register.new', {
				url: '',
				templateUrl: 'components/users/register/register.html',
				controller: 'RegisterController as RegisterCtrl',
			})
			.state('user.register.confirm', {
				url: '/{token}',
				controller: 'RegisterController as RegisterCtrl',
			})
			.state('user.password', {
				url: '/password',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('user.password.resetRequest', {
				url: '/reset',
				templateUrl: 'components/users/password/resetRequest.html',
				controller: 'PasswordController as PasswordCtrl',
			})
			.state('user.password.updateRequest', {
				url: '/change',
				templateUrl: 'components/users/password/updateRequest.html',
				controller: 'PasswordController as PasswordCtrl',
			})
			.state('user.password.resetPassword', {
				url: '/reset/{token}',
				templateUrl: 'components/users/password/resetPassword.html',
				controller: 'PasswordController as PasswordCtrl',
			});
	});