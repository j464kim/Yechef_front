/* Generic Services */
angular.module('helper', [])
	.factory("genericService", function ($q, $timeout) {

		function createFilterFor (query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(item) {
				return (item.value.indexOf(lowercaseQuery) === 0);
			};
		};

		return {
			getModelType: function ($state) {
				var stateName = $state.current.name;
				var modelName = stateName.split(".")[0];
				var modelType = 'App\\Models\\' + modelName;

				var modelInfo = {
					'name': modelName,
					'type': modelType,
				}

				return modelInfo;
			},

			querySearch: function (query, list) {
				var results = query ? list.filter(createFilterFor(query)) : list,
					deferred;
				deferred = $q.defer();
				$timeout(function () {
					deferred.resolve(results);
				}, Math.random() * 1000, false);
				return deferred.promise;
			},
		}
	});