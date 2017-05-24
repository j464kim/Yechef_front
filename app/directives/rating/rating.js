angular.module('rating')
    .directive('ratings', function () {
        return {
            restrict: 'A',
            templateUrl: 'directives/rating/rating.html',
        }
    });