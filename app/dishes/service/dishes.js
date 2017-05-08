'use strict';

angular.module('dishes.api', [
	'configuration'
])

.factory('DishesResource', ['$resource', 'config', 
	function($resource, config) {
		var api_endpoint = config.endpoint + 'dishes/';

		return $resource(api_endpoint + ':id', {id: '@id'},{
            list: {
                method: 'GET',
            },
            show: {
                method: 'GET',
            },
            create: {
				method: 'POST',
            },
			update: {
                method: 'PUT',
            },
            destroy: {
				method: 'DELETE',
            },
		});
	}
])

.service('DishesAPI', ['$q', 'DishesResource',
	function($q, DishesResource){

        function list(pageNum) {
            pageNum = pageNum || 0;

            return $q(function(resolve, reject) {
                DishesResource.list(
                    {
                        page: pageNum
                    }
                ).$promise.then(function(response){
                    resolve(response.body);
                }, function(response) {
                    reject(response)
                });
            });
        };

        function show(dishId) {

            return $q(function(resolve, reject) {
                DishesResource.show(
                    {
                        id: dishId
                    }
                ).$promise.then(function(response){
                    resolve(response.body);
                }, function(response) {
                    reject(response)
                });
            });
        };

		function create(slug, name, description) {
            return $q(function(resolve, reject) {
                DishesResource.create(
                    {
                        slug: slug,
						name: name,
						description: description
                    }
                ).$promise.then(function(response){
                    resolve(response.body);
                }, function(response) {
                    reject(response)
                });
            });
        };

        function update(slug, name, description) {
            return $q(function(resolve, reject) {
                DishesResource.update(
                    {
                        slug: slug,
                        name: name,
                        description: description
                    }
                ).$promise.then(function(response){
                    resolve(response.body);
                }, function(response) {
                    reject(response)
                });
            });
        };

        function destroy() {

            return $q(function(resolve, reject) {
                DishesResource.destroy(
                    {

                    }
                ).$promise.then(function(response){
                    resolve(response.body);
                }, function(response) {
                    reject(response)
                });
            });
        };

		return {
            list: list,
            show: show,
			create: create,
			update: update,
			destroy: destroy,
		};
	}
]);