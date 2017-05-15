angular.module('kitchen.destroy', [
	'kitchen.api'
])

	.controller('KitchenDestroyController', ['$stateParams', 'KitchenAPI', '$scope', '$state',
		function ($stateParams, KitchenAPI, $scope, $state) {

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
				KitchenAPI.destroy(kitchenId).then(function (response) {
					console.log(response);
					$scope.kitchen = response;
					$state.go('kitchen.list');
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
