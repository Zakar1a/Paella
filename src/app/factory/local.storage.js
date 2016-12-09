'use strict';

/**
 * @ngdoc service
 * @name $localstorage
 * @description
 * # $localstorage
 * Service in thte PAELLAWeb.
 */
angular.module('local.storage', []);

angular.module('local.storage')
        .factory('$localstorage', function ($window) {
            return {
                set: function (key, value) {
                    $window.localStorage[key] = value;
                },
                get: function (key, defaultValue) {
                    return $window.localStorage[key] || defaultValue;
                },
                setObject: function (key, value) {
                    $window.localStorage[key] = angular.toJson(value);
                },
                getObject: function (key) {
                    return angular.fromJson($window.localStorage[key] || null);
                }
            };
        });
