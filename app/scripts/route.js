'use strict';

angular.module('routes', [
	'dish.list',
	'dish.list.infinite',
	'kitchen.list',
	'kitchen.show',
	'kitchen.create',
	'kitchen.update'
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
				url: '/list',
				templateUrl: 'dishes/list/template.html',
				controller: 'DishListController as DishCtrl'
			})
			.state('dish.list-infiniteload', {
				url: '/list/infinite',
				templateUrl: 'dishes/list-infinite/template.html',
				controller: 'DishListInfiniteController as DishInfCtrl'
			})
			.state('kitchen', {
				url: '/kitchens',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('kitchen.list', {
				url: '/list',
				templateUrl: 'kitchens/list/template.html',
				controller: 'KitchenListController as KitchenCtrl'
			})
			.state('kitchen.show', {
				url: '/{id}',
				templateUrl: 'kitchens/show/template.html'
			})
			.state('kitchen.create', {
				url: '',
				templateUrl: 'kitchens/create/template.html',
				controller: 'KitchenCreateController as KitchenCtrl'
			})
			.state('kitchen.edit', {
				url: '/edit/{id}',
				templateUrl: 'kitchens/update/template.html',
				controller: 'KitchenUpdateController as KitchenCtrl'
			});

		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise('/');
	});
