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
					// TODO handle error state
					console.error(response);
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
						// TODO handle error state
						console.error(response);
					});
				}
			}

		}
	]);
