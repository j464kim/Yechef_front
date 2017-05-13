angular.module('kitchen.destroy', [
	'kitchen.api'
])

	.controller('KitchenDestroyController', ['$stateParams', 'KitchenAPI', '$scope', '$location',
		function ($stateParams, KitchenAPI, $scope, $location) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var kitchenId = $stateParams.id;

			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _destroyKitchen() {
				console.log('_destroyKitchen ' + kitchenId);
				KitchenAPI.destroy(kitchenId).then(function (response) {
					console.log(response);
					$scope.kitchen = response;
					$location.path('/kitchens/list');
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			$scope.destroyKitchen = _destroyKitchen;


			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
