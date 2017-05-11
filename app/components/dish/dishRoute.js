'use strict';

angular.module('dish', [
	'dish.list',
	'dish.list.infinite',
])

.config(function ($stateProvider) {

	$stateProvider
		.state('dish', {
			url: '/dish',
			abstract: true,
			template: '<ui-view/>'
		})
		.state('dish.list', {
			url: 'list',
			templateUrl: '/components/dish/list/template.html',
			controller: 'DishListController as DishCtrl',
		})
		.state('dish.listInfinite', {
			url: 'list/infinite',
			templateUrl: '/components/dish/listInfinite/template.html',
			controller: 'DishListInfiniteController as DishCtrl',
		});
});