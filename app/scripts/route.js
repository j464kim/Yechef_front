'use strict';

angular.module('routes', [
	'dish.list',

])

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'dishes/list/template.html',
			controller: 'DishListController as DishCtrl',
		});

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise('/');
});