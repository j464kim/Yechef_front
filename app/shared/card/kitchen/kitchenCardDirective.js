'use strict';

angular.module('directive.card.kitchen', [])

	.directive('kitchenCard', ['devHelper', function (devHelper) {
		return {
			restrict: 'E',
			templateUrl: 'shared/card/kitchen/kitchenCardDirective.html',
			scope: {
				kitchen: '='
			},
			link: function (scope, elem) {
				devHelper.log(scope.kitchen);
			},
			controller: function () {
			}
		};
	}]);