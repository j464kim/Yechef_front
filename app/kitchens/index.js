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
				url: '/{id}/edit',
				templateUrl: 'kitchens/update/template.html',
				controller: 'KitchenUpdateController as KitchenCtrl'
			});
	});
