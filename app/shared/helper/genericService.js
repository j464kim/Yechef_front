/* Generic Services */
angular.module('helper', [])
	.factory("genericService", function ($q, $timeout, $mdToast, $mdSidenav, devHelper, config) {

		function _createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(item) {
				return (item.value.indexOf(lowercaseQuery) === 0);
			};
		}

		var getModelType = function ($state) {
			var stateName = $state.current.name;
			var modelName = stateName.split(".")[0];
			var modelType = 'App\\Models\\' + _.capitalize(modelName);

			var modelInfo = {
				'name': modelName,
				'type': modelType,
			};

			return modelInfo;
		};

		var querySearch = function (query, list) {
			var results = query ? list.filter(_createFilterFor(query)) : list;

			return results;
		};

		var loadItems = function (items) {
			return (items).split(/, +/g).map(function (item) {
				return {
					value: item.toLowerCase(),
					display: item
				};
			});
		};

		var getStates = function (country) {
			var states = config.states[country];
			return loadItems(states)
		};

		var getCurrency = function (country) {
			var currency = config.currency[country];
			return currency;
		};

		var showToast = function (message) {
			$mdToast.show(
				$mdToast.simple()
					.textContent(message)
					.position('top center')
					.highlightClass('md-warn')
					.capsule(true)
					.hideDelay(5000)
			);
		};

		var getByUniqueProperty = function (objects, property_name, property_value) {
			for (var key in objects) {
				if (objects[key][property_name] == property_value) {
					return objects[key];
				}
			}
		};

		var buildToggler = function (navID) {
			return function () {
				// Component lookup should always be available since we are not using `ng-if`
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						devHelper.log("toggle " + navID + " is done");
					});
			};
		};

		var openMenu = function ($mdMenu, ev) {
			var originatorEv = ev;
			$mdMenu.open(ev);
		};

		var dishBreakpoints = [
			{
				breakpoint: 2000,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		];

		var kitchenBreakpoints = [
			{
				breakpoint: 2000,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}, {
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		];

		return {
			getModelType: getModelType,
			querySearch: querySearch,
			loadItems: loadItems,
			getStates: getStates,
			getCurrency: getCurrency,
			showToast: showToast,
			getByUniqueProperty: getByUniqueProperty,
			buildToggler: buildToggler,
			openMenu: openMenu,
			dishBreakpoints: dishBreakpoints,
			kitchenBreakpoints: kitchenBreakpoints,

			// parse rgb str into an arr of color elements
			parseRgbStr: function (rgbStr) {
				var rgb = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				return [rgb[1], rgb[2], rgb[3]];
			},

			// shade rgb based on percentage
			// @color str in format of rgb(255,255,255)
			// @percent decimal positive=brighten, negative=darken
			// @returnArr bool default false, return rgb color in arr format
			shadeRGBColor: function (color, percent, returnArr) {
				var f = color.split(","), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent,
					R = parseInt(f[0].slice(4)), G = parseInt(f[1]), B = parseInt(f[2]);
				var rgb = "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
				if (returnArr) {
					return this.parseRgbStr(rgb);
				}
				return rgb;
			},

			// blend color
			// @c0 str in format of rgb(255,255,255)
			// @c1 str in format of rgb(255,255,255)
			// @percent decimal 
			// @returnArr bool default false, return rgb color in arr format
			blendRGBColors: function (c0, c1, p, returnArr) {
				var f = c0.split(","), t = c1.split(","), R = parseInt(f[0].slice(4)), G = parseInt(f[1]),
					B = parseInt(f[2]);
				var rgb = "rgb(" + (Math.round((parseInt(t[0].slice(4)) - R) * p) + R) + "," + (Math.round((parseInt(t[1]) - G) * p) + G) + "," + (Math.round((parseInt(t[2]) - B) * p) + B) + ")";
				if (returnArr) {
					return this.parseRgbStr(rgb);
				}
				return rgb;
			}
		}
	});