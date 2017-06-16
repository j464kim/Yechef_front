'use strict';

angular.module('dish.create', [
	'dishes.api',
])

	.controller('DishCreateController', ['$state', 'DishesAPI', 'devHelper', 'config', '$q', '$timeout', 'genericService', '$stateParams', 'UserAPI',
		function ($state, DishesAPI, devHelper, config, $q, $timeout, genericService, $stateParams, UserAPI) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			this.kitchenId = $stateParams.kid;
			this.nationalities = _loadNationalities();
			this.hasAccess = false;

			function init() {
				_checkAccess();
			}

			function _checkAccess() {
				UserAPI.getMyKitchens().then(
					function (response) {
						devHelper.log(response);
						for (var i in response) {
							if (response[i].id == that.kitchenId) {
								that.hasAccess = true;
								return;
							}
						}
						$state.go('home');
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
			}

			function _createDish() {
				//TODO: Add User permission so that only registered users can create dish
				that.dish.kitchen_id = that.kitchenId;
				DishesAPI.create(that.dish)
					.then(function (response) {
						var newDish = response;
						devHelper.log(newDish);
						_uploadDishMedia(newDish);

						$state.go('dish.show', {"id": newDish.id});
					}, function (response) {
						// TODO handle error state
						console.error(response);
					});
			}

			function _uploadDishMedia(response) {

				// instantiate Dropzone
				var dropzoneInstance = Dropzone.forElement("#dropzone");

				// figure out the model type to pass into dropzone controller
				var mediableInfo = genericService.getModelType($state);

				dropzoneInstance.on("sending", function (file, xhr, formData) {
					formData.append('mediable_id', response.id);
					formData.append('mediable_type', mediableInfo['type']);
				});

				dropzoneInstance.processQueue();
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
			this.createDish = _createDish;
			this.cancel = function cancel() {
				if (confirm("Do you want to go back?")) {
					$state.go('dish.list');
				}
			};

			init();

			/*********************
			 *    EVENTS
			 **********************/


		}
	])