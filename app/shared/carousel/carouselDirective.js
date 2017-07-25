'use strict';

angular.module('carousel', [])
	.directive('carousel', [function () {
		return {
			restrict: 'E',
			templateUrl: 'shared/carousel/carouselDirective.html',
			scope: {
				medias: '=',
				interval: '@'
			},
			controller: function($scope, config, $state) {
				if (!$scope.interval) {
					$scope.interval = config.carouselDefaultInterval;
				}
				$scope.noWrapSlides = false;
				$scope.active = 0;
			}
		};
	}]);