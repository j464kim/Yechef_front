'use strict';

module.directive('pageHeader', ['$rootScope', function () {
	return {
		restrict: 'E', //This means that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
		replace: true,
		scope: {
			login: '='
		}, // This is one of the cool things :). Will be explained in post.
		templateUrl: "components/main/header/header.html",
		controller: ['$scope', '$filter', '$rootScope', function ($scope, $filter, $rootScope) {
			// Your behaviour goes here :)
		}]
	}
}]);