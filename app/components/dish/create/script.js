'use strict';

angular.module('dish.create', [
	'dishes.api',
])

	.controller('DishCreateController', ['$state', 'DishesAPI',
		function ($state, DishesAPI) {

			/*********************
			 *    Private Variables
			 **********************/
				// reference to this controller
			var that = this;

			function _createDish() {
				//TODO: Add User permission so that only registered users can create dish
				DishesAPI.create(that.name, that.description)
					.then(function (response) {
						var newDish = response;
						console.log('new Dish is: ');
						console.log(newDish);

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

				dropzoneInstance.on("sending", function (file, xhr, formData) {
					console.log('mediable id is: ');
					console.log(response.id);
					formData.append('mediable_id', response.id);
					formData.append('mediable_type', 'App\\Models\\Dish');
				});

				dropzoneInstance.processQueue();
			}

			/*********************
			 *    Public Functions
			 **********************/
			this.createDish = _createDish;
			this.cancel = function cancel() {
				if (confirm("Do you want to go back?")) {
					$state.go('dish.listInfinite');
				}
			};

			/*********************
			 *    EVENTS
			 **********************/


		}
	])