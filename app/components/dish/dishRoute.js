'use strict';

angular.module('dish', [
	'dish.list',
	'dish.list.infinite',
	'dish.show',
	'dish.create',
	'dish.update',
	'dish.destroy',
])

	.config(function ($stateProvider) {
		$stateProvider
			.state('dish', {
				url: '/dish',
				abstract: true,
				template: '<ui-view/>'
			})
			// .state('dish.listInfinite', {
			//     url: 'es',
			//     templateUrl: '/components/dish/listInfinite/template.html',
			//     controller: 'DishListInfiniteController as DishCtrl',
			// })
			.state('dish.list', {
				url: 'es?q&vegan&vegetarian&gluten_free&min_price&max_price&nationality&sortBy',
				templateUrl: '/components/dish/list/template.html',
				controller: 'DishListController as DishCtrl',
			})
			.state('dish.show', {
				url: '/show/{id}',
				templateUrl: '/components/dish/show/template.html',
				controller: 'DishShowController as DishCtrl',
			})
			.state('dish.create', {
				url: '/new',
				templateUrl: '/components/dish/create/template.html',
				controller: 'DishCreateController as DishCtrl',
			})
			.state('dish.update', {
				url: '/edit/{id}',
				templateUrl: '/components/dish/update/template.html',
				controller: 'DishUpdateController as DishCtrl',
			})
			.state('dish.destroy', {
				params: {id: {}},
				controller: 'DishDestroyController as DishCtrl',
			});
	});