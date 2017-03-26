'use strict';

angular.module('routes', [
	'dish.list',

])

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			controller: 'DishListController',
			templateUrl: 'dishes/list.html'
		});

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise('/');
});