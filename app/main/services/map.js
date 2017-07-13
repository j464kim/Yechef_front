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

			function getMapOption() {
				var map = {
					center: {latitude: 0, longitude: 0},
					zoom: 13
				};

				map.options = {
					scrollwheel: false,
					disableDefaultUI: true,
					zoomControl: true,
					minZoom: 5,
					maxZoom: 15,
					noClear: false,
				};

				map.options.zoomControlOptions = {
					position: google.maps.ControlPosition.TOP_RIGHT,
				};
				return map;
			}

			function getCircle() {
				var circle = {
					id: 0,
					center: {
						latitude: 0,
						longitude: 0
					},
					radius: 50,
					stroke: {
						color: '#08B21F',
						weight: 2,
						opacity: 1
					},
					fill: {
						color: '#08B21F',
						opacity: 0.5
					},
				};
				return circle;
			}


			return {
				geocode: geocode,
				rgeocode: rgeocode,
				getMapOption: getMapOption,
				getCircle: getCircle,
			};
		}
	]);