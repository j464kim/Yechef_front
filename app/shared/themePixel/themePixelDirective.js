'use strict';

angular.module('directive.themePixel', [])
.directive('themePixel', [function () {
	return {
		restrict: 'E',
		replace: true,
		template: `
			<div id="themePixel">
				<div class="bg-primary"></div>
				<div class="bg-secondary"></div>
				<div class="bg-ternary"></div>
				<div class="bg-quaternary"></div>
			</div>
		`,
		scope: {
			color: "="	
		},
		link: function($scope) {
			$scope.color = {
				primary: angular.element('.bg-primary').css('background-color'),
				secondary: angular.element('.bg-secondary').css('background-color'),
				ternary: angular.element('.bg-ternary').css('background-color'),
				quaternary: angular.element('.bg-quaternary').css('background-color'),
			};
		}
	};
}]);