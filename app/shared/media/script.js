angular.module('dropzone', [])
	.directive('dropzone', function () {
		return function (scope, element, attrs) {
			var config, dropzone;

			config = scope[attrs.dropzone];

			// create a Dropzone for the element with the given options
			dropzone = new Dropzone(element[0], config.options);

			// bind the given event handlers
			angular.forEach(config.eventHandlers, function (handler, event) {
				dropzone.on(event, handler);
			});
		};
	});

angular.module('mediaUpload', [
	'dropzone',
	'media.api'
])

	.controller('MediaController',
		function ($scope) {

			$scope.dropzoneConfig = {

				'options': { // passed into the Dropzone constructor
					'url': '//laravel.dev/api/media',
					'method': 'POST'
				},

				'eventHandlers': {
					'sending': function (file, xhr, formData) {
						console.log('image is being processed');
					},
					'success': function (file, response) {
						console.log('image is successfully uploaded');
					}
				}

			};

		}
	);