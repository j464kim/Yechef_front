'use strict';

angular.module('dish', [
	'dish.list',
	'dish.list.feature',
	'dish.show',
	'dish.create',
	'dish.update',
	'dish.destroy',
])

	.config(function ($stateProvider, config) {
		$stateProvider
			.state('dish', {
				url: '/dish',
				abstract: true,
				template: '<ui-view/>'
			})
			.state('dish.list', {
				url: 'es?' + config.dishSearchParams,
				templateUrl: '/components/dish/list/dishList.html',
				controller: 'DishListController as DishCtrl',
			})
			.state('dish.show', {
				url: '/show/{id}',
				templateUrl: '/components/dish/show/dishShow.html',
				controller: 'DishShowController as DishCtrl',
			})
			.state('dish.create', {
				url: '/new/{kid}',
				templateUrl: '/components/dish/create/dishCreate.html',
				controller: 'DishCreateController as DishCtrl',
			})
			.state('dish.update', {
				url: '/edit/{id}',
				templateUrl: '/components/dish/update/dishUpdate.html',
				controller: 'DishUpdateController as DishCtrl',
			})
			.state('dish.destroy', {
				params: {id: {}},
				controller: 'DishDestroyController as DishCtrl',
			});
	});