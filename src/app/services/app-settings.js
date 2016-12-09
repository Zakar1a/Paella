'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.AppSettings
 * @description
 * # AppSettings
 * Service in thte carsMundo.
 */
angular.module('PAELLAWeb')
        .service('AppSettings', function AppSettings($log, $location) {

            var that = this;
            that.debug = true;
            //that.SERVER_BASE_URL = "http://35.165.69.123:8080/Lemak/";
            that.SERVER_BASE_URL = "http://localhost:8080/Lemak/"

            // get app base url
            that.getServerBaseUrl = function () {
                return that.SERVER_BASE_URL;
            };
            // get app base url
            that.getBaseUrl = function () {
                var protocol = $location.protocol();
                var host = $location.host();
                var port = $location.port();
                var absurl = $location.absUrl();
                var path = $location.path();

                //console.log("HASH :: "+$location.hash());
                //console.log("path :: "+$location.path());
                //console.log("search :: "+$location.search());
                //console.log("absUrl :: "+$location.absUrl());

                var BASE_URL = "";
                if (port == 80 || port == 443) {
                    BASE_URL = protocol + "://" + host + "/";
                } else {
                    BASE_URL = protocol + "://" + host + ":" + port + "/";
                }

                var URI = absurl.replace(BASE_URL, "").replace("#" + path, "").replace("index.html#", "").replace("index.html", "");

                //console.log(BASE_URL+" <> "+subfolders);

                if (URI != "") {
                    BASE_URL = BASE_URL + URI;
                    $log.log(BASE_URL);
                }

                //return BASE_URL;
                //BASE_URL = "http://localhost:12345/";
                return BASE_URL;
            };

            // get browser info
            that.getBrowserInfo = function () {
                var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if (/trident/i.test(M[1])) {
                    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return { name: 'IE', version: (tem[1] || '') };
                }
                if (M[1] === 'Chrome') {
                    tem = ua.match(/\bOPR\/(\d+)/)
                    if (tem != null) { return { name: 'Opera', version: tem[1] }; }
                }
                M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
                if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
                return {
                    name: M[0],
                    version: M[1]
                };
            };

            // get guid
            that.guid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
            };

            // get client id
            that.getClientID = function () {
                var browserInfo = that.getBrowserInfo();
                var clientID = browserInfo.name + '-' + browserInfo.version + '-' + that.guid();
                return clientID;
            };
        });
