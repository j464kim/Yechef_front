'use strict';

angular.module('kitchen.show', [
	'kitchen.api'
])

	.controller('KitchenShowController', ['$stateParams', 'KitchenAPI', 'devHelper',
		function ($stateParams, KitchenAPI, devHelper) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var kitchenId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/

			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showKitchen();
				_getkitchenAdmins();
			}

			function _showKitchen() {
				KitchenAPI.show(kitchenId).then(function (response) {
                    devHelper.log(response);
					that.kitchen = response;
					that.media = response.medias[0].url;
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _getkitchenAdmins() {
				KitchenAPI.admins(kitchenId).then(function (response) {
					console.log(response);
					that.kitchenAdmins = response;
				}, function (response) {
					//TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/


			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
