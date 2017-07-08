'use strict';

angular.module('carousel', [])
	.directive('carousel', [function () {
		return {
			restrict: 'E',
			templateUrl: 'shared/carousel/carouselDirective.html',
			scope: {
				medias: '='
			}
		};
	}]);