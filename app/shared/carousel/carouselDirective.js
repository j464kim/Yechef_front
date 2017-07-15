'use strict';

angular.module('carousel', [])
	.directive('carousel', [function () {
		return {
			restrict: 'E',
			templateUrl: 'shared/carousel/carouselDirective.html',
			scope: {
				medias: '=',
				myInterval: '@'
			},
			controller: function($scope) {
				if (!$scope.myInterval) {
					$scope.myInterval = 5000;
				}
				$scope.noWrapSlides = false;
				$scope.active = 0;
			}
		};
	}]);