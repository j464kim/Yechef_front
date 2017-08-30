angular.module('cropper', [])

	.service('cropperService', [
		function () {

			this.dataURItoBlob = function (dataURI, mimeType) {
				var byteString = atob(dataURI.split(',')[1]);
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				return new Blob([ab], {type: mimeType});
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

			// https://github.com/fengyuanchen/cropper/issues/542
			// We need to explicitly determine mimetype of the image from the file content
			// to avoid insane increase in file size after cropping.
			this.dataURLtoMimeType = function (dataURL, extension) {
				var BASE64_MARKER = ';base64,';
				var data;

				if (dataURL.indexOf(BASE64_MARKER) == -1) {
					var parts = dataURL.split(',');
					var contentType = parts[0].split(':')[1];
					data = decodeURIComponent(parts[1]);
				} else {
					var parts = dataURL.split(BASE64_MARKER);
					var contentType = parts[0].split(':')[1];
					var raw = window.atob(parts[1]);
					var rawLength = raw.length;

					data = new Uint8Array(rawLength);

					for (var i = 0; i < rawLength; ++i) {
						data[i] = raw.charCodeAt(i);
					}
				}

				var arr = data.subarray(0, 4);
				var header = "";
				for (var i = 0; i < arr.length; i++) {
					header += arr[i].toString(16);
				}
				switch (header) {
					case "89504e47":
						mimeType = "image/png";
						break;
					case "47494638":
						mimeType = "image/gif";
						break;
					case "ffd8ffe0":
					case "ffd8ffe1":
					case "ffd8ffe2":
						mimeType = "image/jpeg";
						break;
					default:
						mimeType = extension; // Or you can use the blob.type as fallback
						break;
				}
				return mimeType;
			}
		}
	]);
