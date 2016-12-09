/**
 * Created by Zakaria on 12/4/2016.
 */
'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.RestService
 * @description
 * # RestService
 * Service in the PAELLAWeb.
 */

angular.module('PAELLAWeb')
        .service('RestService', function RestService($log, $q, $http, AppSettings, $httpParamSerializer, Authorization) {

            var that = this;

            that.url = AppSettings.getServerBaseUrl();

            that.AuthorizationRequired = false;

            that.SetAuthorizationRequired = function(val){
                if(angular.isDefined(val)){
                    that.AuthorizationRequired = val;
                }else {
                    that.AuthorizationRequired = false;
                }
            };

            that.getAuthorizationKey = function(){
                return Authorization.getKey();
            };

            that.getHeader = function (headers) {
                var result = {};
//                result['Content-Type'] = "application/x-www-form-urlencoded"; application/json;charset=UTF-8
                result['Content-Type'] = "application/json";
                if(that.AuthorizationRequired){
                    result.Authorization = Authorization.getKey();
                }

                if ((headers instanceof Object) && !(headers instanceof Array)) {
                    var keys = Object.keys(headers);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        var value = headers[key];
                        if (key == "ContentType") {
                            key = "Content-Type";
                        }
                        result[key] = value;
                    }
                }

                return result;
            };
            that.isJsonOrObjData = function(data){
                if ((data instanceof Object) && !(data instanceof Array)) {
                    return true;
                }
                return false;
            };

            that.getParamsFromJsonOrObj = function(data){
                var params = $httpParamSerializer(data);
                return params;
            };

            that.getData = function (uri, data) {
                var params = "";
                // make url
                var url = that.url + uri;
                // promise init
                //var deffered = $q.defer();
                // get params from data
                if (data != undefined && data != null && data != "") {
                    // check is it object
                    if ((data instanceof Object) && !(data instanceof Array)) {
                        var keys = Object.keys(data);
                        for (var i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            var value = data[key];
                            params = params + key + "=" + value + "&";
                            params = params.substring(0, params.length - 1);
                        }

                    } else {
                        $log.error("data is not Object [getData::" + data + "]");
                    }
                }

                return sendToAJAXRequest('GET', url, params);
            };
            that.postData = function (uri, data, headers) {
                var url = that.url + uri;
                return sendToAJAXRequest('POST', url, data, headers);
            };
            that.putData = function (uri, data, headers) {
                var url = that.url + uri;
                return sendToAJAXRequest('PUT', url, data, headers);
            };

            that.fileSendWithData = function (uri, formData) {
                var deffered = $q.defer();

                var url = that.url + uri;
                // call to CloudSight for image validation
                angular.element.ajax({
                    url: url,
                    cache: false,
                    data: formData,
                    method: "POST",
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    enctype: 'multipart/form-data',
                    headers: {
                        "Authorization": Authorization.getKey(),
                        "cache-control": "no-cache"
                    },
                    success: function (data, status, headers, config) {
                        deffered.resolve({
                            'data': data,
                            'status': status,
                            'headers': headers,
                            'config': config
                        });
                    },
                    error: function (data, status, headers, config) {
                        deffered.reject({
                            'data': data,
                            'status': status,
                            'headers': headers,
                            'config': config
                        });
                    }
                });

                return deffered.promise;
            };


            var sendToAJAXRequest = function (method, url, data, headers) {
                var deffered = $q.defer();

                $http({
                    method: method,
                    url: url,
                    data: data,
                    headers: that.getHeader(headers),
                    // This makes it so that this request doesn't send the JWT
                    skipAuthorization: !that.AuthorizationRequired
                }).success(function (data, status, headers, config) {
                    deffered.resolve({
                        'data': data,
                        'status': status,
                        'headers': headers,
                        'config': config
                    });
                }).error(function (data, status, headers, config) {
                    deffered.reject({
                        'data': data,
                        'status': status,
                        'headers': headers,
                        'config': config
                    });
                });

                return deffered.promise;
            };

        });
