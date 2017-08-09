angular.module('cropper', [])

	.service('cropperService', [
		function () {

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
				var modalTemplate = '<div>Error: Unable to get Cropper Template. Please Try Again</div>';
				$.ajax({
					url: 'shared/cropper/cropperTemplate.html',
					method: 'GET',
					dataType: 'html', //** Must add
					async: false,
					success: function (data) {
						modalTemplate = data;
					}
				});
				return modalTemplate;
			};
		}
	]);
