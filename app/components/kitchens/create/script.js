'use strict';

angular.module('kitchen.create', [
	'kitchen.api',
])

	.controller('KitchenCreateController', ['$state', 'KitchenAPI',
		function ($state, KitchenAPI) {


			// $controller('MediaController', {mediaScope: $scope});
			// mediaScope.processQueue();

			/*********************
			 *  Private Variables
			 **********************/
			// reference to this controller

			/*********************
			 *  Public Variables
			 **********************/
			var that = this;

			/*********************
			 *  Private Functions
			 **********************/

			function _createKitchen() {

				KitchenAPI.create(that.kitchen).then(function (response) {
					var newKitchen = response;
					console.log('new Kitchen is: ');
					console.log(newKitchen);

					_uploadKitchenMedia(newKitchen);

					$state.go('kitchen.show', {'id': newKitchen.id});
				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

			function _uploadKitchenMedia(response) {

				// instantiate Dropzone
				var dropzoneInstance = Dropzone.forElement("#dropzone");

				dropzoneInstance.on("sending", function (file, xhr, formData) {
					console.log('mediable id is: ');
					console.log(response.id);
					formData.append('mediable_id', response.id);
					formData.append('mediable_type', 'App\\Models\\Kitchen');
				});

				dropzoneInstance.processQueue();
			}


			/*********************
			 *  Public Functions
			 **********************/
			this.createKitchen = _createKitchen;


			/*********************
			 *  Initialization
			 **********************/

			/*********************
			 *  EVENTS
			 **********************/

		}
	]);
