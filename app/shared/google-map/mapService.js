'use strict';

angular.module('map.service', [])
	.service('mapService', [
		function () {

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
					maxZoom: 20,
				};

				map.options.zoomControlOptions = {
					position: google.maps.ControlPosition.TOP_LEFT,
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

			function getWindow() {
				var window = {
					ctrl: {},
					show: false,
					closeClick: function () {
						this.show = false;
					},
					options: {
						content: '',
						pixelOffset: {
							height: -15,
							width: 0
						}
					},
					templateUrl: 'shared/google-map/googleMapWindow.html',
					templateParameter: {}
				};
				return window;
			}

			function getClusterOption() {
				var clusterOption = {
					averageCenter: false,
					zoomOnClick: false
				};
				return clusterOption;
			}

			function restrictAddressByCountry(ctrl, country) {
				ctrl.addressOptions = {
					componentRestrictions: {}
				};
				ctrl.addressOptions.componentRestrictions.country = country;
			}

			return {
				getMapOption: getMapOption,
				getCircle: getCircle,
				getWindow: getWindow,
				getClusterOption: getClusterOption,
				restrictAddressByCountry: restrictAddressByCountry
			};
		}
	]);