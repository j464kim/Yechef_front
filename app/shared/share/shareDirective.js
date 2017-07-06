'use strict';

angular.module('share', ['720kb.socialshare'])
	.directive('shareButton', [function () {
		return {
			restrict: 'E',
			templateUrl: 'shared/share/shareDirective.html',
			scope: {
				for: '@'
			}
		};
	}]);