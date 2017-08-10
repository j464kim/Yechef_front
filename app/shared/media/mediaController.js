angular.module('mediaUpload', [
	'configuration',
	'media.api',
	'cropper'
])

	.controller('MediaController', ['config', 'devHelper', 'sessionService', 'mediaService', '$state', 'AuthAPI', 'cropperService',
		function (config, devHelper, sessionService, mediaService, $state, AuthAPI, cropperService) {

			/*********************
			 *  Private Functions
			 **********************/
			function _dropzoneInit() {
				Dropzone.autoDiscover = config.autoDiscover;
				var myDropzone = new Dropzone('#dropzone', {
					url: config.endpoint + 'media/',
					method: 'POST',
					maxFiles: config.maxFiles,
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

						myDropzone.on('thumbnail', function (file) {
							// ignore files which were already cropped and re-rendered
							// to prevent infinite loop
							if (file.cropped) {
								return;
							}
							// cache filename to re-assign it to cropped file
							var cachedFilename = file.name;
							// remove not cropped file from dropzone (we will replace it later)
							myDropzone.removeFile(file);

							// dynamically create modals to allow multiple files processing
							var $cropperModal = $(cropperService.getCropperModalTemplate());
							// 'Crop and Upload' button in a modal
							var $uploadCrop = $cropperModal.find('.crop-upload');

							var $img = $('<img id="image-to-crop" />');
							var mimeType = '';
							// initialize FileReader which reads uploaded file
							var reader = new FileReader();
							reader.onloadend = function () {
								// Find the true mime type
								mimeType = cropperService.dataURLtoMimeType(reader.result, file.type);
								// add uploaded and read image to modal
								$cropperModal.find('.image-container').html($img);
								$img.attr('src', reader.result);

								// initialize cropper for uploaded image
								$img.cropper({
									viewMode: 1,
									aspectRatio: 1.8,
									autoCropArea: 1,
									movable: true,
									cropBoxResizable: true,
									minContainerWidth: 300,
									minContainerHeight: 400,
								});
							};
							// read uploaded file (triggers code above)
							reader.readAsDataURL(file);

							$cropperModal.modal('show');

							// listener for 'Crop and Upload' button in modal
							$uploadCrop.on('click', function () {
								// get cropped image data
								var blob = $img.cropper('getCroppedCanvas').toDataURL(mimeType);
								// transform it to Blob object
								var newFile = cropperService.dataURItoBlob(blob, mimeType);
								// set 'cropped to true' (so that we don't get to that listener again)
								newFile.cropped = true;
								// assign original filename
								newFile.name = cachedFilename;

								// add cropped file to dropzone
								myDropzone.addFile(newFile);
								// upload cropped file with dropzone
								$cropperModal.modal('hide');
							});
						});

						myDropzone.on("complete", function (file) {
							myDropzone.removeFile(file);
						});

						myDropzone.on("success", function (file, xhr, formData) {
							devHelper.log('image is successfully uploaded');
							$state.reload();
							// For updating Profile picture at the top right headaer.
							AuthAPI.setCurrentUser();
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