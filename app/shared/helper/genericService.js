/* Generic Services */
angular.module('helper', [])
	.factory("genericService", function ($q, $timeout, $mdToast) {

		function createFilterFor (query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(item) {
				return (item.value.indexOf(lowercaseQuery) === 0);
			};
		};

		return {
			getModelType: function ($state) {
				var stateName = $state.current.name;
				var modelName = stateName.split(".")[0];
				var modelType = 'App\\Models\\' + modelName;

				var modelInfo = {
					'name': modelName,
					'type': modelType,
				}

				return modelInfo;
			},

			querySearch: function (query, list) {
				var results = query ? list.filter(createFilterFor(query)) : list,
					deferred;
				deferred = $q.defer();
				$timeout(function () {
					deferred.resolve(results);
				}, Math.random() * 1000, false);
				return deferred.promise;
			},

			showToast: function(message) {
				$mdToast.show(
					$mdToast.simple()
						.textContent(message)
						.position('top center')
						.highlightClass('md-warn')
						.capsule(true)
						.hideDelay(3000)
				);
			},

			// parse rgb str into an arr of color elements
			parseRgbStr: function(rgbStr) {
				var rgb = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
				return [rgb[1], rgb[2], rgb[3]];
			},

			// shade rgb based on percentage
			// @color str in format of rgb(255,255,255)
			// @percent decimal positive=brighten, negative=darken
			// @returnArr bool default false, return rgb color in arr format
			shadeRGBColor: function(color, percent, returnArr = false) {
				var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
				var rgb = "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
				if(returnArr) {
					return this.parseRgbStr(rgb);
				}
				return rgb;
			},

			// blend color
			// @c0 str in format of rgb(255,255,255)
			// @c1 str in format of rgb(255,255,255)
			// @percent decimal 
			// @returnArr bool default false, return rgb color in arr format
			blendRGBColors: function(c0, c1, p, returnArr = false) {
				var f=c0.split(","),t=c1.split(","),R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
				var rgb = "rgb("+(Math.round((parseInt(t[0].slice(4))-R)*p)+R)+","+(Math.round((parseInt(t[1])-G)*p)+G)+","+(Math.round((parseInt(t[2])-B)*p)+B)+")";
				if(returnArr) {
					return this.parseRgbStr(rgb);
				}
				return rgb;
			}
		}
	});