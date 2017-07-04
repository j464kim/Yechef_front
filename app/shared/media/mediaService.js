angular.module('mediaUpload')

	.service('mediaService', ['genericService', '$state', 'MediaAPI', 'devHelper',
		function (genericService, $state, MediaAPI, devHelper) {

			this.init = function () {

				// instantiate Dropzone
				this.dropzoneInstance = Dropzone.forElement("#dropzone");
			};

			this.uploadMedia = function (mediable) {

				// figure out the model type to pass into dropzone controller
				var mediableInfo = genericService.getModelType($state);

				this.dropzoneInstance.on("sending", function (file, xhr, formData) {
					formData.append('mediable_id', mediable.id);
					formData.append('mediable_type', mediableInfo['type']);
				});

				this.dropzoneInstance.processQueue();
			};

			this.previewUploadedMedias = function (myDropzone) {

				MediaAPI.show(20).then(function (response) {

					devHelper.log(response);
					var medias = response;

					for (var i = 0; i < medias.length; i++) {
						var mockFile = {name: i, size: 12345};

						myDropzone.options.addedfile.call(myDropzone, mockFile);
						myDropzone.options.thumbnail.call(myDropzone, mockFile, medias[i].url);
					}

				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			};

			this.removeUploadedMedia = function () {
				console.log('destroy uploaded media');

				MediaAPI.destroy(20).then(function (response) {

					devHelper.log(response);
					var deletedMedia = response;

				}, function (response) {
					// TODO handle error state
					console.error(response);
				});
			}

		}
	]);
