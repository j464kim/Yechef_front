'use strict';

angular.module('routes', [
	'dish.list',
	'dish.list.infinite',
])

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'homepage/template.html'
		})
		.state('dish', {
			url: '/dish',
			abstract: true,
			template: '<ui-view/>'
		})
		.state('dish.list', {
			url: 'list',
			templateUrl: 'dishes/list/template.html',
			controller: 'DishListController as DishCtrl',
		})
		.state('dish.list-infiniteload', {
			url: 'list/infinite',
			templateUrl: 'dishes/list-infinite/template.html',
			controller: 'DishListInfiniteController as DishCtrl',
		});

	// For any unmatched url, redirect to /
	$urlRouterProvider.otherwise('/');
});
