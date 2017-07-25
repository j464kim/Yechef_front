'use strict';

angular.module('kitchen.update', [
	'kitchen.api'
])

	.controller('KitchenUpdateController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper', 'genericService',
		function ($stateParams, KitchenAPI, $state, devHelper, genericService) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _updateKitchen(myCurrentKitchenToEdit, ukCtrl) {
				KitchenAPI.update(myCurrentKitchenToEdit, myCurrentKitchenToEdit.id).then(function (response) {
					var updatedKitchen = response;
					ukCtrl.myCurrentKitchen.name = updatedKitchen.name;
					ukCtrl.myCurrentKitchen.phone = updatedKitchen.phone;
					ukCtrl.myCurrentKitchen.address = updatedKitchen.address;
					ukCtrl.myCurrentKitchen.email = updatedKitchen.email;
					ukCtrl.myCurrentKitchen.description = updatedKitchen.description;
					ukCtrl.myCurrentKitchen.medias = updatedKitchen.medias;
					devHelper.log(response);
					$state.go('user.kitchen.general.view', {'myCurrentKitchenId': updatedKitchen.id});
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.updateKitchen = _updateKitchen;


			/*********************
			 *  Initialization
			 **********************/


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
