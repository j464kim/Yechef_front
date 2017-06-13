'use strict';

angular.module('dish.create', [
	'dishes.api',
])

	.controller('DishCreateController', ['$state', 'DishesAPI', 'devHelper', 'config', '$q', '$timeout', 'genericService',
		function ($state, DishesAPI, devHelper, config, $q, $timeout, genericService) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			this.nationalities = _loadNationalities();
			this.querySearch = querySearch;

			function _createDish() {
				//TODO: Add User permission so that only registered users can create dish
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
				var mediable_type = genericService.getModelType($state);

				dropzoneInstance.on("sending", function (file, xhr, formData) {
					formData.append('mediable_id', response.id);
					formData.append('mediable_type', mediable_type);
				});

				dropzoneInstance.processQueue();
			}

			/**
			 * Search for nationalities... use $timeout to simulate
			 * remote dataservice call.
			 */
			function querySearch(query) {
				var results = query ? that.nationalities.filter(createFilterFor(query)) : that.nationalities,
					deferred;
				deferred = $q.defer();
				$timeout(function () {
					deferred.resolve(results);
				}, Math.random() * 1000, false);
				return deferred.promise;
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

			/**
			 * Create filter function for a query string
			 */
			function createFilterFor(query) {
				var lowercaseQuery = angular.lowercase(query);

				return function filterFn(nationality) {
					return (nationality.value.indexOf(lowercaseQuery) === 0);
				};

			}

			/*********************
			 *    Public Functions
			 **********************/
			this.createDish = _createDish;
			this.cancel = function cancel() {
				if (confirm("Do you want to go back?")) {
					$state.go('dish.list');
				}
			};

			/*********************
			 *    EVENTS
			 **********************/


		}
	])