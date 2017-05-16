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
				templateUrl: 'components/kitchens/list/template.html',
				controller: 'KitchenListController as KitchenCtrl'
			})
			.state('kitchen.create', {
				url: '/new',
				templateUrl: 'components/kitchens/create/template.html',
				controller: 'KitchenCreateController as KitchenCtrl'
			})
			.state('kitchen.edit', {
				url: '/edit/{id}',
				templateUrl: 'components/kitchens/update/template.html',
				controller: 'KitchenUpdateController as KitchenCtrl'
			})
			.state('kitchen.show', {
				url: '/show/{id}',
				templateUrl: 'components/kitchens/show/template.html',
				controller: 'KitchenShowController as KitchenCtrl'
			});

	});
