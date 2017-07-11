'use strict';

angular.module('directive.themePixel', [
	'helper',
])
.directive('themePixel', ['genericService', 
	function (genericService) {
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
				themes: "="	
			},
			link: function($scope) {
				var primaryElem 	= angular.element('.bg-primary');
				var secondaryElem 	= angular.element('.bg-secondary');
				var ternaryElem 	= angular.element('.bg-ternary');
				var quaternaryElem 	= angular.element('.bg-quaternary');

				var defaultColor 	= 'rgb(255, 255, 0)';
				var defaultFontColor= 'rgb(255, 255, 255)';

				var primary 		= primaryElem.css('background-color') || defaultColor;
				var primaryFont 	= primaryElem.css('color') || defaultFontColor;
				var secondary 		= secondaryElem.css('background-color') || defaultColor;
				var secondaryFont 	= secondaryElem.css('color') || defaultFontColor;
				var ternary 		= ternaryElem.css('background-color') || defaultColor;
				var ternaryFont 	= ternaryElem.css('color') || defaultFontColor;
				var quaternary		= quaternaryElem.css('background-color') || defaultColor;
				var quaternaryFont	= quaternaryElem.css('color') || defaultFontColor;

				primaryFont = genericService.parseRgbStr(primaryFont);
				secondaryFont = genericService.parseRgbStr(secondaryFont);
				ternaryFont = genericService.parseRgbStr(ternaryFont);
				quaternaryFont = genericService.parseRgbStr(quaternaryFont);


				var primaryTheme = {
					"50": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, 0.25, true)},
					"100": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, 0.2, true)},
					"200": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, 0.15, true)},
					"300": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, 0.1, true)},
					"400": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, 0.05, true)},
					"500": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, 0, true)},
					"600": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, -0.05, true)},
					"700": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, -0.1, true)},
					"800": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, -0.15, true)},
					"900": {contrast: primaryFont, value: genericService.shadeRGBColor(primary, -0.2, true)},
					"A100": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.2, true)},
					"A200": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.1, true)},
					"A400": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, -0.1, true)},
					"A700": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, -0.2, true)}
				};

				var secondaryTheme = {
					"50": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.25, true)},
					"100": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.2, true)},
					"200": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.15, true)},
					"300": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.1, true)},
					"400": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0.05, true)},
					"500": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, 0, true)},
					"600": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, -0.05, true)},
					"700": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, -0.1, true)},
					"800": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, -0.15, true)},
					"900": {contrast: secondaryFont, value: genericService.shadeRGBColor(secondary, -0.2, true)},
					"A100": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.2, true)},
					"A200": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.1, true)},
					"A400": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, -0.1, true)},
					"A700": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, -0.2, true)}
				};

				var ternaryTheme = {
					"50": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.25, true)},
					"100": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.2, true)},
					"200": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.15, true)},
					"300": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.1, true)},
					"400": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0.05, true)},
					"500": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, 0, true)},
					"600": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, -0.05, true)},
					"700": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, -0.1, true)},
					"800": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, -0.15, true)},
					"900": {contrast: ternaryFont, value: genericService.shadeRGBColor(ternary, -0.2, true)},
					"A100": {contrast: quaternaryFont, value: genericService.shadeRGBColor(quaternary, 0.2, true)},
					"A200": {contrast: quaternaryFont, value: genericService.shadeRGBColor(quaternary, 0.1, true)},
					"A400": {contrast: quaternaryFont, value: genericService.shadeRGBColor(quaternary, -0.1, true)},
					"A700": {contrast: quaternaryFont, value: genericService.shadeRGBColor(quaternary, -0.2, true)}
				};

				$scope.themes = {
					primary: primaryTheme,
					secondary: secondaryTheme,
					ternary: ternaryTheme
				};
			}
		};
	}
]);