angular.module('mediaUpload')

	.service('mediaService', ['genericService', '$state', 'MediaAPI', 'devHelper',
		function (genericService, $state, MediaAPI, devHelper) {

			this.init = function () {

				// instantiate Dropzone
				this.dropzoneInstance = Dropzone.forElement("#dropzone");

				// initiate uploaded media ids for removal
				this.mediaIds = [];
			};

			this.uploadMedia = function (mediable) {

				// figure out the model type to pass into dropzone controller
				var mediableInfo = genericService.getModelType($state);

				this._removeSelectedUploadedMedia(this.mediaIds);

				this.dropzoneInstance.on("sending", function (file, xhr, formData) {
					formData.append('mediable_id', mediable.id);
					formData.append('mediable_type', mediableInfo['type']);
				});

				this.dropzoneInstance.processQueue();
			};

			this.previewUploadedMedia = function (mediable) {

				// figure out the model type
				var mediableInfo = genericService.getModelType($state);

				MediaAPI.show(mediableInfo['name'], mediable.id).then(function (response) {

					devHelper.log(response);
					var medias = response;
					var dropzoneInstance = Dropzone.forElement("#dropzone");

					for (var i = 0; i < medias.length; i++) {
						var mockFile = {media_id: medias[i].id, size: 12345};

						dropzoneInstance.options.addedfile.call(dropzoneInstance, mockFile);
						dropzoneInstance.options.thumbnail.call(dropzoneInstance, mockFile, medias[i].url);
					}

				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
			};

			this.retrieveMediaToBeRemoved = function (mediaId) {

				this.mediaIds.push(mediaId);
				devHelper.log(this.mediaIds);
			};

			this._removeSelectedUploadedMedia = function (mediaIds) {

				for (var i = 0; i < mediaIds.length; i++) {

					MediaAPI.destroy(mediaIds[i]).then(function (response) {

						devHelper.log(response);
						var deletedMedia = response;

					}, function (response) {
						genericService.showToast('Oops..! Something is wrong');
						devHelper.log(response, 'error');
					});
				}
			};

			this.dataURItoBlob = function (dataURI) {
				var byteString = atob(dataURI.split(',')[1]);
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				return new Blob([ab], {type: 'image/jpeg'});
			};

			this.getCropperModalTemplate = function () {
				var modalTemplate = '' +
					'<div class="modal fade" tabindex="-1" role="dialog">' +
					'<div class="modal-dialog modal-cropper" role="document">' +
					'<div class="modal-content">' +
					'<div class="modal-header">' +
					'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
					'<h4 class="modal-title">Crop Image</h4>' +
					'</div>' +
					'<div class="modal-body">' +
					'<div class="image-container text-center"></div>' +
					'</div>' +
					'<div class="modal-footer">' +
					'<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
					'<button type="button" class="btn btn-primary crop-upload">Upload</button>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'</div>' +
					'';
				return modalTemplate;
			};
		}
	]);
