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

				options: { // passed into the Dropzone constructor
					url: '//laravel.dev/api/media',
					method: 'POST',
					maxFileSize: 4, // 4mb
					acceptedFiles: 'image/jpeg, images/jpg, image/png',
					parallelUploads: 10,
					uploadMultiple: true,
					autoProcessQueue: false,
					addRemoveLinks: true,

					init: function () {
						var submitButton = document.querySelector("#submit-media");
						myDropzone = this; // closure

						submitButton.addEventListener("click", function () {
							myDropzone.processQueue(); // Tell Dropzone to process all queued files.
						});

						myDropzone.on("complete", function (file) {
							// alert("Image is uploaded.");
							myDropzone.removeFile(file);
						});
					}
				},

				'eventHandlers': {
					'sending': function (file, xhr, formData) {
						var email = $("#email").val();
						console.log('email is: ' + email);
						console.log('//laravel.dev/api/media/' + email);
						// pass email to request
						formData.append('email', email);
						console.log('image is being processed');
					},
					'success': function (file, response) {
						console.log('image is successfully uploaded');
					}
				}

			};

		}
	);