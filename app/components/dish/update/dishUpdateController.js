'use strict';

angular.module('dish.update', [
	'dishes.api',
	'mediaUpload'
])

	.controller('DishUpdateController', ['$state', '$stateParams', 'DishesAPI', 'config', '$q', '$timeout', 'genericService', 'UserAPI', 'devHelper', 'mediaService',
		function ($state, $stateParams, DishesAPI, config, $q, $timeout, genericService, UserAPI, devHelper, mediaService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;
			var dishId = $stateParams.id;

			/*********************
			 *    Public Variables
			 **********************/
			this.nationalities = _loadNationalities();
			this.kitchen = {};

			/*********************
			 *    Private Functions
			 **********************/

			function _init() {
				_checkAccess(dishId);
			}

			function _checkAccess(dishId) {
				DishesAPI.checkOwnership(dishId).then(
					function (response) {
						devHelper.log(response);
						_showDish();
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
			}

			function _showDish() {
				DishesAPI.show(dishId)
					.then(function (response) {
						that.dish = response;
						that.dish.nationality = {
							value: that.dish.nationality,
							display: that.dish.nationality
						};
						mediaService.previewUploadedMedia(that.dish);
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
			}

			function _updateDish() {
				that.dish.nationality = that.dish.nationality.value;
				DishesAPI.update(that.dish, that.dish.id)
					.then(function (response) {
						var updatedDish = response;
						devHelper.log(updatedDish);
						mediaService.uploadMedia(updatedDish);
						$state.go('user.kitchen.dish',
							{
								"myCurrentKitchenId": that.dish.kitchen_id
							});
					}, function (response) {
						//     TODO handle error state
						console.error(response);
					});
			}

			/**
			 * Build `states` list of key/value pairs
			 */
			function _loadNationalities() {

				return (config.nationalities).split(/, +/g).map(function (nationality) {
					return {
						value: nationality.toLowerCase(),
						display: nationality
					};
				});
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.querySearch = genericService.querySearch;
			this.updateDish = _updateDish;
			this.cancel = function cancel() {
				if (confirm("Do you want to go back?")) {
					$state.go('user.kitchen.dish',
						{
							"myCurrentKitchenId": that.dish.kitchen_id
						});
				}
			};

			/*********************
			 *    Initialization
			 **********************/
			_init();

			/*********************
			 *    EVENTS
			 **********************/


		}
	])