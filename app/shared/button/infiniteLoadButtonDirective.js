'use strict';

angular.module('directive.button', [])

	.directive('infiniteLoadButton', ['devHelper', function (devHelper) {
		return {
			restrict: 'E',
			templateUrl: 'shared/button/infiniteLoadButton.html',
			scope: {
				currentPage: '=',
				lastPage: '=',
				loadFunction: '=',
			},
			link: function (scope, elem) {
			},
			controller: function () {
			}
		};
	}]);
