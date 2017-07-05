'use strict';

angular.module('map.api', [
	'configuration'
])

	.service('MapAPI', ['uiGmapGoogleMapApi', 'devHelper', '$q',
		function (uiGmapGoogleMapApi, devHelper, $q) {

			function geocode(address) {
				var defer = $q.defer();
				uiGmapGoogleMapApi.then(
					function (maps) {
						var geocoder = new maps.Geocoder();
						geocoder.geocode({'address': address}, function (results, status) {
							devHelper.log(results);
							defer.resolve(results);
						});
					}
				);
				return defer.promise;
			}

			function rgeocode(latitude, longitude) {
				var defer = $q.defer();
				uiGmapGoogleMapApi.then(
					function (maps) {
						var latlng = new maps.LatLng(latitude, longitude);
						var geocoder = new maps.Geocoder();
						geocoder.geocode({'latLng': latlng}, function (results, status) {
							devHelper.log(results);
							defer.resolve(results);
						});
					}
				);
				return defer.promise;
			}


			return {
				geocode: geocode,
				rgeocode: rgeocode,
			};
		}
	]);