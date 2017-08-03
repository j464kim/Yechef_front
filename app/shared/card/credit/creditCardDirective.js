'use strict';

angular.module('directive.card.credit', [])

	.directive('creditCard', ['devHelper', function (devHelper) {
		return {
			restrict: 'E',
			templateUrl: 'shared/card/credit/creditCardDirective.html',
			scope: {
				card: '=',
				default: '='
			},
			link: function (scope, elem) {
				devHelper.log(scope.dish);
			},
			controller: function () {
			}
		};
	}]);