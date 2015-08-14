'use strict';

angular.module('farol.token', [])

.factory('TokenHandler', function($window, $http, API, $rootScope) {
    var tokenHandler = {};
    var token = 'none';

    tokenHandler.set = function(newToken) {
        token = newToken;
        $window.sessionStorage.accessToken = newToken;
    }

    function get() {
        if(typeof token === 'undefined' || token === 'none'){
            if(typeof $window.sessionStorage.accessToken !== 'undefined') {
                token = $window.sessionStorage.accessToken;
            }
        }
        return token;
    }

    tokenHandler.get = function() {
        return get();
    }

    tokenHandler.getMe = function() {
        var payload = {
            headers: {
                'Authorization': 'Bearer ' + get()
            }
        };

        return $http.get(API.URL + '/v1/u/me', payload)
        .success(function(data) {
            $rootScope.currentUser = data;
        });
    }

    tokenHandler.wrapActions = function(resource, actions) {
        var wrappedResource = resource;
        for(var i=0; i < actions.length; i++) {
            tokenWrapper(wrappedResource, actions[i]);
        }

        return wrappedResource;
    }

    var tokenWrapper = function(resource, action) {
        resource['_' + action] = resource[action];

        resource[action] = function(data, success, error) {
            return resource['_' + action](
                angular.extend({}, data || {}, {access_token: tokenHandler.get()}),
                success,
                error
            );
        };

    }

    return tokenHandler;
})
