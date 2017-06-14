/* Generic Services */
angular.module('helper', [])
	.factory("genericService", function () {
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
			}
		}

	});