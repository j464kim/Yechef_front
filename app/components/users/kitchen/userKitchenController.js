angular.module('user.kitchen', [
	'ngMaterial',
	'chart.js',
])

	.controller('userKitchenController', function ($scope, $timeout, $mdSidenav, devHelper) {
		$scope.people = [
			{ name: 'Janet Perkins', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56ZsAfy-cSFhFg6qovcr0fGQTnyDIRfJx1XMdOs05isUElvHk', newMessage: true },
			{ name: 'Mary Johnson', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa345vyMQ2BOYz7ih_ZDsRjaX7JWACP9oqEw2Bv8m5bKsYlO7Z', newMessage: false },
			{ name: 'Peter Carlsson', img: 'http://cfile231.uf.daum.net/image/225F964253A15B0C24800A', newMessage: false }
		];

		$scope.doSecondaryAction = function(event) {
			$mdDialog.show(
				$mdDialog.alert()
					.title('Secondary Action')
					.textContent('Secondary actions can be used for one click actions')
					.ariaLabel('Secondary click demo')
					.ok('Neat!')
					.targetEvent(event)
			);
		};

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


