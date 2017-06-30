angular.module('user.kitchen.general', [
	'ngMaterial',
])

	.controller('userKitchenGeneralController', function ($scope, $timeout, $mdSidenav, devHelper, UserAPI, KitchenAPI, $state, $stateParams, $q, genericService, $mdToast) {
		var that = this;

		this.myCurrentKitchenId = $stateParams.myCurrentKitchenId;
		that.myCurrentKitchen = $stateParams.myCurrentKitchen;
		that.isKitchenSelected = false;

		function _init() {
			_getKitchenAdmins();
			_getUsers();
		}

		function _getKitchenAdmins() {
			KitchenAPI.getAdmins(that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
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

		function _updateKitchen(myCurrentKitchenToEdit, ukCtrl) {
			KitchenAPI.update(myCurrentKitchenToEdit, that.myCurrentKitchen.id).then(function (response) {
				var updatedKitchen = response;
				ukCtrl.myCurrentKitchen.name = updatedKitchen.name;
				ukCtrl.myCurrentKitchen.phone = updatedKitchen.phone;
				ukCtrl.myCurrentKitchen.address = updatedKitchen.address;
				ukCtrl.myCurrentKitchen.email = updatedKitchen.email;
				ukCtrl.myCurrentKitchen.description = updatedKitchen.description;
				ukCtrl.myCurrentKitchen.medias = updatedKitchen.medias;
				devHelper.log(response);
				$state.go('user.kitchen.general.view', {'myCurrentKitchenId': updatedKitchen.id});
			}, function (response) {
				// TODO handle error state
				console.error(response);
			});
		}

		this.addAdmin = function () {
			devHelper.log(that.adminToAdd);
			KitchenAPI.addAdmin(that.adminToAdd.id, that.myCurrentKitchenId).then(function (response) {
				devHelper.log(response);
				_getKitchenAdmins();
			}, function (response) {
				//TODO handle error state
				$mdToast.show(
					$mdToast.simple()
						.textContent(response.data.message)
						.position('top center')
						.highlightClass('md-warn')
						.capsule(true)
						.hideDelay(3000)
				);
				console.error(response);
			});
		};

		this.removeAdmin = function (adminId) {
			if (confirm("Remove this admin??")) {
				KitchenAPI.removeAdmin(adminId, that.myCurrentKitchenId).then(function (response) {
					devHelper.log(response);
					_getKitchenAdmins();
				}, function (response) {
					//TODO handle error state
					console.error(response);
				});
			}
		};

		this.querySearch = genericService.querySearch;
		this.updateKitchen = _updateKitchen;

		_init();

	});


