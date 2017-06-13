angular.module('user.kitchen', [
	'ngMaterial',
	'chart.js',
])

	.controller('userKitchenController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, $q) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
		that.myCurrentKitchen = $stateParams.myCurrentKitchen;
		that.isKitchenSelected = false;

		function _init() {
			_getMyKitchens();
			_getkitchenAdmins();
			_getUsers();
		}

		$scope.$watch(function () {
			return that.myCurrentKitchen
		}, function (newVal, oldVal) {
			_prepareEdit();
		});

		function _prepareEdit() {
			that.myCurrentKitchenToEdit = Object.assign({}, that.myCurrentKitchen);
		};

		function _getMyKitchens() {
			UserAPI.list('getMyKitchens').then(
				function (response) {
					devHelper.log(response);
					that.myKitchens = response;
				}, function (response) {
					// TODO handle error state ie. front end display
					console.error(response);
				});
		};

		function _getkitchenAdmins() {
			KitchenAPI.admins(that.myCurrentKitchenId).then(function (response) {
				console.log(response);
				that.kitchenAdmins = response;
			}, function (response) {
				//TODO handle error state
				console.error(response);
			});
		}

		function _getUsers() {
			UserAPI.list('list').then(
				function (response) {
					devHelper.log(response);
					that.users = response;
					that.users = that.users.map(function (user) {
						user.value = user.email.toLowerCase();
						return user;
					});
				}, function (response) {
					//TODO handle error state
					console.error(response);
				});
		};

		function _updateKitchen() {
			KitchenAPI.update(that.myCurrentKitchenToEdit, that.myCurrentKitchen.id).then(function (response) {
				var updatedKitchen = response;
				that.myCurrentKitchen.name = updatedKitchen.name;
				that.myCurrentKitchen.phone = updatedKitchen.phone;
				that.myCurrentKitchen.address = updatedKitchen.address;
				that.myCurrentKitchen.email = updatedKitchen.email;
				that.myCurrentKitchen.description = updatedKitchen.description;
				that.myCurrentKitchen.medias = updatedKitchen.medias;
				devHelper.log(response);
				$state.go('user.kitchen.general.view', {'myCurrentKitchenId': updatedKitchen.id});
			}, function (response) {
				// TODO handle error state
				console.error(response);
			});
		}

		/**
		 * Search for repos... use $timeout to simulate
		 * remote dataservice call.
		 */
		function querySearch(query) {
			var results = query ? that.users.filter(createFilterFor(query)) : that.users,
				deferred;
			deferred = $q.defer();
			$timeout(function () {
				deferred.resolve(results);
			}, Math.random() * 1000, false);
			return deferred.promise;
		}


		/**
		 * Create filter function for a query string
		 */
		function createFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(item) {
				return (item.value.indexOf(lowercaseQuery) === 0);
			};
		};


		this.updateKitchen = _updateKitchen;
		this.prepareEdit = _prepareEdit;

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

		this.addAdmin = function () {
			console.log(that.adminToAdd);
			alert(that.adminToAdd + that.myCurrentKitchen.id);
		};

		that.querySearch = querySearch;

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


