'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.UtilsServices
 * @description
 * # Utils Services
 * Service in the PAELLAWeb.
 // set fail data
    deffered.reject({
        'data': data.data,
        'status': status
        
        
    });
 */

angular.module('PAELLAWeb')
        .service('UtilsServices', function UtilsServices($q, $log, $location, MessageUtils, RestService) {

            var that = this;

            // get project version
            that.getVersion = function () {
                // promise init
                var deffered = $q.defer();

                // request data
                var uri = "api/getVersion/";
                var data = {};

                // call to rest service
                RestService.getData(uri, data).then(function (response) {
                    // set success data
                    deffered.resolve(response);
                }, function (response) {
                    // load error message if has
                    var resultObj = MessageUtils.MessageParser(response, "User", "error");
                    MessageUtils.ToasterMessage(resultObj);
                });

                // return asynchronous data
                return deffered.promise;
            };

        });
