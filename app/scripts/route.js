'use strict';

angular.module('routes', [
    'dish.list',
    'dish.list.infinite',
    'dish.show',
    'dish.create',
    'dish.update',
    'dish.destroy',
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
            })
            .state('dish.show', {
                url: '/show/{id}',
                templateUrl: 'dishes/show/template.html',
            })
            .state('dish.create', {
                url: '/create',
                templateUrl: 'dishes/create/template.html',
                // controller: 'DishCreateController as DishCtrl',
            })
            .state('dish.update', {
                url: '/update/{id}',
                templateUrl: 'dishes/update/template.html',
                //controller: 'DishUpdateController as DishCtrl',
            })
            .state('dish.destroy', {
                url: '/destroy/{id}',
                templateUrl: 'dishes/destroy/template.html',
                controller: 'DishDestroyController as DishCtrl',
            });

        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');
    });