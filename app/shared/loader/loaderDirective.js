angular.module('directive.loader', [])

	.directive('loader', ['$http', function ($http) {
		return {
			restrict: 'EA',
			transclude: true,
			scope: true,
			templateUrl: 'shared/loader/loaderDirective.html',
			link: function (scope, elem) {
				scope.isLoading = function () {
					return typeof $http.pendingRequests == 'undefined' ? false : $http.pendingRequests.length > 0;
				};

				scope.$watch(scope.isLoading, function (value) {
					if (value) {
						elem.find('.loader-overlay').fadeIn();
					} else {
						elem.find('.loader-overlay').fadeOut();
					}
				});
			}
		};
	}]);