angular.module('user.kitchen', [
	'ngMaterial',
	'chart.js',
])

	.controller('userKitchenController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, genericService) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
		that.isKitchenSelected = false;

		function _init() {
			_getMyKitchens();
		}

		$scope.toggleLeft = genericService.buildToggler('left');
		$scope.toggleRight = genericService.buildToggler('right');

		function _getMyKitchens() {
			UserAPI.getMyKitchensInCompactList().then(
				function (response) {
					devHelper.log(response);
					if (!that.myKitchens) {
						that.myKitchens = [];
					}
					that.myKitchens = response;
				}, function (response) {
					genericService.showToast('Oops..! Something is wrong');
					devHelper.log(response, 'error');
				});
		};

		function _selectKitchen(kitchenId) {
			KitchenAPI.show(kitchenId).then(function (response) {
				devHelper.log(response);
				that.myCurrentKitchen = response;
				that.isKitchenSelected = true;
				if (response.medias.length) {
					that.media = response.medias[0].url;
				}
			}, function (response) {
				genericService.showToast('Oops..! Something is wrong');
				devHelper.log(response, 'error');
			});
		}

		function _switchKitchen(kitchenId, notify) {
			if (!notify) {
				_selectKitchen(kitchenId);
			}
			$state.go('.', {'myCurrentKitchenId': kitchenId}, {notify: notify});
		}

		this.preSelect = function () {
			if (that.myCurrentKitchenId) {
				for (index in that.myKitchens) {
					var kitchen = that.myKitchens[index];
					if (kitchen.id == that.myCurrentKitchenId) {
						// mapService.restrictAddressByCountry(that, kitchen.country);
						that.myCurrentKitchenSelect = kitchen;
						_selectKitchen(kitchen.id);
						return true;
					}
				}
			} else {
				//If No current Kitchen is set, just set the first kitchen to be selected
				that.myCurrentKitchenSelect = that.myKitchens[0];
				_switchKitchen(that.myKitchens[0].id, false);
			}
		};

		this.selectChanged = function () {
			_switchKitchen(that.myCurrentKitchenSelect.id, true);
		};

		_init();

	})

	.controller("LineGraphCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

		$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};

		// Simulate async data update
		$timeout(function () {
			$scope.data = [
				[28, 48, 40, 19, 86, 27, 90],
				[65, 59, 80, 81, 56, 55, 40]
			];
		}, 3000);
	}])

	.controller("DynamicChartCtrl", function ($scope) {
		$scope.labels = ["BiBimBab", "Cold Noodle", "Scallop Fried Rice", "HandMade Coffee", "Cookie"];
		$scope.data = [300, 500, 100, 40, 120];
		$scope.type = 'polarArea';

		$scope.toggleChart = function () {
			$scope.type = $scope.type === 'polarArea' ?
				'pie' : 'polarArea';
		};
	});


