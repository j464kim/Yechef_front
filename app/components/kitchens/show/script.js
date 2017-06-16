'use strict';

angular.module('kitchen.show', [
	'kitchen.api', 'ngMaterial'
])

	.controller('KitchenShowController', ['$stateParams', 'KitchenAPI', 'devHelper', '$mdDialog', '$rootScope',
		function ($stateParams, KitchenAPI, devHelper, $mdDialog, $rootScope) {

			/*********************
			 *  Private Variables
			 **********************/
				// reference to this controller

			var that = this;
			var kitchenId = $stateParams.id;
			/*********************
			 *  Public Variables
			 **********************/
			this.isMine = false;
			/*********************
			 *  Private Functions
			 **********************/

			function _init() {
				_showKitchen();
				_getKitchenAdmins();
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

			function _getKitchenAdmins() {
				KitchenAPI.getAdmins(kitchenId).then(function (response) {
					devHelper.log(response);
					that.kitchenAdmins = response;
					if ($rootScope.currentUser) {
						for (var i in that.kitchenAdmins) {

							if (that.kitchenAdmins[i].id === $rootScope.currentUser.id) {
								that.isMine = true;
								break;
							}
						}
					}
				}, function (response) {
					//TODO handle error state
					console.error(response);
				});
			}

			/*********************
			 *  Public Functions
			 **********************/
			this.showChefs = function (ev) {
				$mdDialog.show({
					contentElement: '#showChefs',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true
				});
			};

			this.closeDialog = function () {
				$mdDialog.cancel();
			};

			/*********************
			 *  Initialization
			 **********************/
			_init();


			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
