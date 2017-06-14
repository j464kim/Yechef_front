'use strict';

angular.module('auth.api', [
    'satellizer',
    'ngCookies'
])

    .config(function ($authProvider, config, $cookiesProvider) {

        $authProvider.google({
            clientId: config.googleAppId,
            url: config.endpoint + 'auth/google',
        });

        $authProvider.facebook({
            clientId: config.facebookAppId,
            url: config.endpoint + 'auth/facebook',
        });

        // set cookie expiration
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + config.cookieExpirationInDays);
        $cookiesProvider.defaults.expires = expireDate;
    })

    .service('AuthResource', ['$resource', 'config', '$http', '$auth', 'devHelper',
        function ($resource, config, $http, $auth, devHelper) {
            var api_endpoint = config.endpoint;

            function register(newUser) {
                devHelper.log(newUser);
                return $http({
                    method: 'POST',
                    url: api_endpoint + 'register',
                    params: newUser,
                })
            }

            function login(email, password) {
                return $http({
                    method: 'POST',
                    url: api_endpoint + 'login',
                    params: {
                        email: email,
                        password: password
                    }
                });
            };

            function logout() {
                return $http({
                    method: 'POST',
                    url: api_endpoint + 'logout'
                });
            };

            function socialLogin(provider) {
                return $auth.authenticate(provider)
            };

            function refreshToken(refreshToken) {
                return $http({
                    method: 'POST',
                    url: api_endpoint + 'refresh-token',
                    params: {
                        refresh_token: refreshToken
                    }
                })
            };

            return {
                register: register,
                login: login,
                logout: logout,
                socialLogin: socialLogin,
                refreshToken: refreshToken
            };
        }
    ])

    .service('sessionService', ['$cookies',
        function ($cookies) {
            var token = {};

            function setSession(accessToken, refreshToken, expireIn, tokenType) {
                // storage refreshToken in cookie
                $cookies.put('refresh_token', refreshToken);
                // calculate expire time
                var expireDate = new Date(new Date().getTime() + (1000 * expireIn));
                // storage accessToken in cookie
                $cookies.put("access_token", tokenType + ' '+ accessToken, {'expires': expireDate});

                token = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    expireIn: expireIn,
                    tokenType: tokenType
                }
            }

            function revokeSession() {
                $cookies.remove('refresh_token');
                $cookies.remove('token_expires_at');
                token = {};
            }

            function getAccessToken() {
                var accessToken = $cookies.get('access_token');
                if (accessToken) {
                    return accessToken;
                } else {
                    // revokeSession();
                    return null;
                }
            }

            function getRefreshToken() {
                return $cookies.get('refresh_token');
            }

            function isLogin() {
                if ($cookies.get('refresh_token')) {
                    return true;
                }
                return false;
            }

            return {
                setSession: setSession,
                revokeSession: revokeSession,
                getAccessToken: getAccessToken,
                getRefreshToken: getRefreshToken,
                isLogin: isLogin,
            }
        }
    ])

    .service('AuthAPI', ['$q', 'AuthResource', 'sessionService', 'authService',
        function ($q, AuthResource, sessionService, authService) {

            function register(newUser) {
                return $q(function (resolve, reject) {
                    AuthResource.register(newUser).then(function (response) {
                        var data = response.data.body;
                        sessionService.setSession(
                            data.access_token,
                            data.refresh_token,
                            data.expires_in,
                            data.token_type
                        );
                        resolve(data);
                    }, function (response) {
                        reject(response)
                    });
                });
            };

            function login(email, password) {

                return $q(function (resolve, reject) {
                    AuthResource.login(email, password).then(function (response) {
                        var data = response.data.body;
                        sessionService.setSession(
                            data.access_token,
                            data.refresh_token,
                            data.expires_in,
                            data.token_type
                        );
                        resolve(data);
                    }, function (response) {
                        reject(response);
                    });
                });
            };


            function socialLogin(provider) {
                return $q(function (resolve, reject) {
                    AuthResource.socialLogin(provider).then(function (response) {
                        var data = response.data.body;
                        sessionService.setSession(
                            data.access_token,
                            data.refresh_token,
                            data.expires_in,
                            data.token_type
                        );
                        authService.loginConfirmed();
                        resolve(data);
                    }, function (response) {
                        authService.loginCancelled();
                        reject(response);
                    });
                });
            };


            function logout() {
				return $q(function (resolve, reject) {
                    AuthResource.logout().then(function (response) {
                        sessionService.revokeSession();
                        resolve(response.data.body);
                    }, function (response) {
                        reject(response);
                    });
                });
            };


            function refreshToken() {
                return $q(function (resolve, reject) {
                    var refreshToken = sessionService.getRefreshToken()
                    AuthResource.refreshToken(refreshToken).then(function (response) {
                        var data = response.data.body;
                        sessionService.setSession(
                            data.access_token,
                            data.refresh_token,
                            data.expires_in,
                            data.token_type
                        );
                        authService.loginConfirmed();
                        resolve(data);
                    }, function (response) {
                        authService.loginCancelled();
                        reject(response);
                    });
                });
            };


            return {
                register: register,
                login: login,
                socialLogin: socialLogin,
                logout: logout,
                refreshToken: refreshToken
            };
        }
    ]);