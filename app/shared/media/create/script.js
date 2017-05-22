angular.module('mediaUpload', ['configuration'])

	.controller('MediaController', ['config', function (config) {

		/*********************
		 *  Private Functions
		 **********************/
		function _dropzoneInit() {
			var myDropzone = new Dropzone('#dropzone', {
				url: config.endpoint + 'media/',
				method: 'POST',
				maxFiles: config.maxFiles,
				maxFileSize: config.maxFileSize,
				acceptedFiles: config.acceptedFiles,
				parallelUploads: config.parallelUploads,
				uploadMultiple: config.uploadMultiple,
				autoProcessQueue: config.autoProcessQueue,
				addRemoveLinks: config.addRemoveLinks,
				init: function () {
					myDropzone = this; // closure

					myDropzone.on("complete", function (file) {
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