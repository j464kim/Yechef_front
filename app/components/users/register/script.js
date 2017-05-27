'use strict';

angular.module('user.register', [
    'user.api',
    'configuration',
])


    .controller('UserRegisterController', ['$state', 'AuthAPI',
        function ($state, AuthAPI) {

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
                            console.log(response);
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