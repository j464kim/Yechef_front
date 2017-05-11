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



		return {
			list: list,
		};
	}
]);