angular.module('user.kitchen', [
	'ngMaterial',
	'chart.js',
])

	.controller('userKitchenController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
		that.myCurrentKitchen = $stateParams.myCurrentKitchen;
		that.isKitchenSelected = false;

		function _init() {
			_getMyKitchens();
		}

		$scope.$watch(function () {
			return that.myCurrentKitchen
		}, function (newVal, oldVal) {
			that.myCurrentKitchenToEdit = angular.copy(newVal);
		});

		function _getMyKitchens() {
			UserAPI.getMyKitchens().then(
				function (response) {
					devHelper.log(response);
					that.myKitchens = response;
				}, function (response) {
					// TODO handle error state ie. front end display
					console.error(response);
				});
		};

		this.preSelect = function () {
			if (that.myCurrentKitchenId) {
				for (index in that.myKitchens) {
					var kitchen = that.myKitchens[index];
					if (kitchen.id == that.myCurrentKitchenId) {
						that.myCurrentKitchen = kitchen;
						that.isKitchenSelected = true;
						return true;
					}
				}
			}
		};

		this.selectChanged = function () {
			$state.go('.', {'myCurrentKitchenId': that.myCurrentKitchen.id, 'myCurrentKitchen': that.myCurrentKitchen});
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


