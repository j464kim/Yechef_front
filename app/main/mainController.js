'use strict';

angular.module('main.controller', [])

    .controller('MainCtrl', ['$scope', '$rootScope', 'AuthAPI', 'devHelper', '$state', 'sessionService',
        function ($scope, $rootScope, AuthAPI, devHelper, $state, sessionService) {

            $scope.$on('event:auth-loginRequired', function (event, data) {
                devHelper.log('refreshing token...');
                AuthAPI.refreshToken().then(function () {
                    devHelper.log('Token successfully refreshed');
                }, function () {
                    devHelper.log('Fail to refresh token, redirecting to login page');
                    $state.go('user.login');
                });
            });

            this.isLoggedin = sessionService.isLogin;
        }
    ]);