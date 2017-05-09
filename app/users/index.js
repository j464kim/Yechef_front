'use strict';

angular.module('user', [
	'user.login'
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
			templateUrl: 'users/login/template.html',
			controller: 'UserLoginController as LoginCtrl',
		});
});