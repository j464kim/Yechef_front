'use strict';

angular.module('kitchen', [
	'kitchen.list',
	'kitchen.show',
	'kitchen.create',
	'kitchen.update',
	'kitchen.destroy'
])

	.config(function ($stateProvider) {

		$stateProvider
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
			.state('kitchen.create', {
				url: '/new',
				templateUrl: 'kitchens/create/template.html',
				controller: 'KitchenCreateController as KitchenCtrl'
			})
			.state('kitchen.edit', {
				url: '/edit/{id}',
				templateUrl: 'kitchens/update/template.html',
				controller: 'KitchenUpdateController as KitchenCtrl'
			})
			.state('kitchen.show', {
				url: '/show/{id}',
				templateUrl: 'kitchens/show/template.html',
				controller: 'KitchenShowController as KitchenCtrl'
			});

	});
