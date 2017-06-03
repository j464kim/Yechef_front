angular.module('rating')
    .directive('ratings', function () {
        return {
            restrict: 'E',
            templateUrl: 'shared/rating/ratingDirective.html',
        }
    });