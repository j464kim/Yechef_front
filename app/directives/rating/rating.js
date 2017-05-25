angular.module('rating')
    .directive('ratings', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/rating/rating.html',
        }
    });