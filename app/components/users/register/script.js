'use strict';

angular.module('user.register', [
    'user.api',
    'configuration',
])


    .controller('UserRegisterController', ['$state', 'AuthAPI', 'devHelper',
        function ($state, AuthAPI, devHelper) {

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
                AuthAPI.register(that.newUser)
                    .then(
                        function (response) {
                            //set access token
                            devHelper.log(response);
                            $state.go('home');
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

            /*********************
             *    EVENTS
             **********************/

        }
    ]);