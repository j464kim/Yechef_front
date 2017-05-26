'use strict';

angular.module('user.register', [
    'user.api',
    'configuration',
    'LocalStorageModule'
])


    .controller('UserRegisterController', ['$state', 'UserAPI', 'localStorageService',
        function ($state, UserAPI, localStorageService) {

            /*********************
             *    Private Variables
             **********************/
                // reference to this controller
            var that = this;

            /*********************
             *    Private Variables
             **********************/
            this.newUser = {};

            /*********************
             *    Private Functions
             **********************/

            function _register() {
                UserAPI.register(that.newUser)
                    .then(
                        function (response) {
                            //set access token
                            localStorageService.set('access_token', response.access_token);
                            localStorageService.set('refresh_token', response.refresh_token);
                            localStorageService.set('expires_in', response.expires_in);
                            console.log(response);
                        },
                        function (response) {
                            console.error(response);
                        }
                    );
            }

            function _socialLogin(provider) {
                UserAPI.socialLogin(
                    provider
                ).then(
                    function (response) {
                        //set access token
                        localStorageService.set('access_token', response.access_token);
                        localStorageService.set('refresh_token', response.refresh_token);
                        localStorageService.set('expires_in', response.expires_in);
                        console.log(response);
                    },
                    function (response) {
                        console.error(response);
                    }
                );
            }

            /*********************
             *    Public Functions
             **********************/
            this.register = _register;
            this.socialLogin = _socialLogin;

            /*********************
             *    EVENTS
             **********************/

        }
    ]);