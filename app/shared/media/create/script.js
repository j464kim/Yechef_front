angular.module('mediaUpload', [])

	.controller('MediaController', ['$scope', function ($scope) {

		/*********************
		 *  Private Functions
		 **********************/
		function _dropzoneInit() {
			var myDropzone = new Dropzone('#dropzone', {
				url: '//laravel.dev/api/media',
				method: 'POST',
				maxFiles: 3,
				maxFileSize: 4, // 4mb
				acceptedFiles: 'image/jpeg, images/jpg, image/png',
				parallelUploads: 10,
				uploadMultiple: true,
				autoProcessQueue: false,
				addRemoveLinks: true,
				init: function () {
					myDropzone = this; // closure

					myDropzone.on("complete", function (file) {
						// alert("Image is uploaded.");
						myDropzone.removeFile(file);
					});

					myDropzone.on("success", function (file, xhr, formData) {
						console.log('image is successfully uploaded');
					});
				}
			});
		}

		/*********************
		 *  Initialization
		 **********************/
		_dropzoneInit();

		}]
	);