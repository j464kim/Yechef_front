'use strict';

angular.module('directive.card.dish', [
	'carousel'
])

	.directive('dishCard', ['devHelper', function (devHelper) {
		return {
			restrict: 'E',
			templateUrl: 'shared/card/dish/dishCardDirective.html',
			scope: {
				dish: '='
			},
			link: function (scope, elem) {
				devHelper.log(scope.dish);
			},
			controller: function () {
			}
		};
	}]);