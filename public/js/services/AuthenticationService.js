angular.module('studying-node')

    .config(function($authProvider) {
        $authProvider.httpInterceptor = function() { return true; },
        $authProvider.withCredentials = true;
        $authProvider.baseUrl = '/';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'satellizer';
        $authProvider.authHeader = 'Authorization';
        $authProvider.authToken = 'Bearer';
        $authProvider.storageType = 'localStorage';

        // Facebook
        $authProvider.facebook({
            clientId: '282319505440877',
            name: 'facebook',
            url: '/auth/facebook',
            authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
            redirectUri: window.location.origin + '/',
            requiredUrlParams: ['display', 'scope'],
            scope: ['email'],
            scopeDelimiter: ',',
            display: 'popup',
            type: '2.0',
            popupOptions: { width: 580, height: 400 }
        });
    })


    .factory('AuthService', function($rootScope, $http, $q, $auth, User, Restangular, Auth){

        return {
            getProfile: function(){
                console.log('Aqui getProfile');

                return $q(function(resolve, reject) {
                    User.one('profile').get().then(
                        function (response) {
                            resolve(response);
                        },
                        function (error) {
                            reject(error);
                        }
                    );
                });
            },
            register: function(user){
                return $q(function(resolve, reject) {
                    $auth.signup(user)
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                });
            },
            authenticate: function(){
                return $q(function(resolve, reject) {
                    $auth.authenticate('facebook')
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                });
            },
            login: function(user) {
                return $q(function(resolve, reject) {
                    $auth.login(user)
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        });
                });
            },
            logout: function() {
                return $q(function(resolve, reject) {

                    if (!$auth.isAuthenticated()) { resolve(); }

                    $auth.logout()
                        .then(function(response) {
                            resolve(response);
                        })
                        .catch(function(error) {
                            reject(error);
                        });;
                });
            },
            isAuthenticated: function(){
                return $auth.isAuthenticated();
            }
        }

    })

    .factory('Auth', function(Restangular) {
        return Restangular.service('auth');
    })

    .factory('User', function(Restangular) {
        return Restangular.service('user');
    })