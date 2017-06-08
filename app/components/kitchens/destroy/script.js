angular.module('kitchen.destroy', [
	'kitchen.api'
])

	.controller('KitchenDestroyController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper',
		function ($stateParams, KitchenAPI, $state, devHelper) {

			/*********************
			 *  Private Variables
			 **********************/// reference to this controller

			var that = this;
			var kitchenId = $stateParams.id;

			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _destroyKitchen() {
				KitchenAPI.destroy(kitchenId).then(function (response) {
                    devHelper.log(response);
					that.kitchen = response;
					$state.go('kitchen.list');
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.destroyKitchen = _destroyKitchen;


			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
