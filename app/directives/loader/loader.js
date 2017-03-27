angular.module('directive.loader', [])

.directive('loader',   ['$http' ,function ($http) {
    console.log("loader");
    return {
        restrict: 'EA',
        transclude: true,
        scope: true,
        templateUrl: 'directives/loader/loader.html',
        link: function (scope, elem) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (value)
            {
                if(value){
                    elem.find('.loader-overlay').fadeIn();
                }else{
                    elem.find('.loader-overlay').fadeOut();
                }
            });
        }
    };
}]);