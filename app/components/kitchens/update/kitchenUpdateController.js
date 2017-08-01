'use strict';

angular.module('kitchen.update', [
	'kitchen.api'
])

	.controller('KitchenUpdateController', ['$stateParams', 'KitchenAPI', '$state', 'devHelper', 'genericService', 'MapAPI',
		function ($stateParams, KitchenAPI, $state, devHelper, genericService, MapAPI) {

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
				if (typeof myCurrentKitchenToEdit.address == 'string') {
					MapAPI.geocode(myCurrentKitchenToEdit.address).then(function (result) {
							if (result) {
								devHelper.log(result);
								myCurrentKitchenToEdit.lat = result[0].geometry.location.lat();
								myCurrentKitchenToEdit.lng = result[0].geometry.location.lng();
								_executeUpdate(myCurrentKitchenToEdit, ukCtrl);
							}
						}
					);
				} else if (typeof myCurrentKitchenToEdit.address == 'object') {
					myCurrentKitchenToEdit.lat = myCurrentKitchenToEdit.address.geometry.location.lat();
					myCurrentKitchenToEdit.lng = myCurrentKitchenToEdit.address.geometry.location.lng();
					myCurrentKitchenToEdit.address = myCurrentKitchenToEdit.address.formatted_address;
					_executeUpdate(myCurrentKitchenToEdit, ukCtrl);
				}
			}

			function _executeUpdate(myCurrentKitchenToEdit, ukCtrl) {
				KitchenAPI.update(myCurrentKitchenToEdit, myCurrentKitchenToEdit.id).then(function (response) {
					var updatedKitchen = response;
					ukCtrl.myCurrentKitchen.name = updatedKitchen.name;
					ukCtrl.myCurrentKitchen.phone = updatedKitchen.phone;
					ukCtrl.myCurrentKitchen.address = updatedKitchen.address;
					ukCtrl.myCurrentKitchen.email = updatedKitchen.email;
					ukCtrl.myCurrentKitchen.description = updatedKitchen.description;
					ukCtrl.myCurrentKitchen.medias = updatedKitchen.medias;
					ukCtrl.myCurrentKitchenToEdit.lat = updatedKitchen.lat;
					ukCtrl.myCurrentKitchenToEdit.lng = updatedKitchen.lng;
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
