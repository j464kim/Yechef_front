angular.module('mediaUpload', [
	'configuration',
	'media.api'
])

	.controller('MediaController', ['config', 'devHelper', 'sessionService', 'mediaService',
		function (config, devHelper, sessionService, mediaService) {

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
					headers: {
						'Authorization': sessionService.getAccessToken()
					},
					init: function () {
						myDropzone = this; // closure

						myDropzone.on("complete", function (file) {
							myDropzone.removeFile(file);
						});

						myDropzone.on("success", function (file, xhr, formData) {
							devHelper.log('image is successfully uploaded');
						});

						myDropzone.on("maxfilesexceeded", function (file) {
							//TODO: update UI accordingly
							devHelper.log('You can only upload upto 3 images');
						});

						myDropzone.on("removedfile", function (file) {
							devHelper.log('removed the media');
							mediaService.retrieveMediaToBeRemoved(file.media_id);
						});
					}
				});

			}

			/*********************
			 *  Initialization
			 **********************/
			_dropzoneInit();
			mediaService.init();
		}]
	);