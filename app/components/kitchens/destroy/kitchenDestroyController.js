angular.module('kitchen.destroy', [
	'kitchen.api'
])

	.controller('KitchenDestroyController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper', 'genericService',
		function ($stateParams, KitchenAPI, $state, devHelper, genericService) {

			/*********************
			 *  Private Variables
			 **********************/// reference to this controller

			var that = this;

			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _destroyKitchen(kitchenId) {
				if (confirm("Do you want to delete the dish?")) {
					KitchenAPI.destroy(kitchenId).then(function (response) {
						devHelper.log(response);
						that.kitchen = response;
						$state.go('kitchen.list');
					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				} else {
				}

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
