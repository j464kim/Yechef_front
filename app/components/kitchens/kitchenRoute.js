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
				templateUrl: 'components/kitchens/list/kitchenList.html',
				controller: 'KitchenListController as KitchenCtrl'
			})
			.state('kitchen.create', {
				url: '/new',
				templateUrl: 'components/kitchens/create/kitchenCreate.html',
				controller: 'KitchenCreateController as KitchenCtrl'
			})
			.state('kitchen.show', {
				url: '/show/{id}',
				templateUrl: 'components/kitchens/show/kitchenShow.html',
				controller: 'KitchenShowController as KitchenCtrl'
			});

	});
