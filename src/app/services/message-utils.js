'use strict';

/**
 * @ngdoc service
 * @name PAELLAWeb.AppUtils
 * @description
 * # MessageUtils
 * Service in thte PAELLAWeb.
 */
angular.module('PAELLAWeb')
        .service('MessageUtils', function MessageUtils(toaster) {

            var that = this;

            /* Toaster */
            that.getMessageObj = function (type, title, body) {
                if (type == "success") {
                    return {
                        type: "success",
                        title: title == undefined ? "SUCCESS" : title,
                        body: body == undefined ? "Success" : body
                    };
                } else if (type == "error") {
                    return {
                        type: "error",
                        title: title == undefined ? "ERROR" : title,
                        body: body == undefined ? "Unknown Error" : body
                    };
                } else if (type == "warning") {
                    return {
                        type: "warning",
                        title: title == undefined ? "WARNING" : title,
                        body: body == undefined ? "Warning" : body
                    };
                } else if (type == "note") {
                    return {
                        type: "note",
                        title: title == undefined ? "INFO" : title,
                        body: body == undefined ? "Info" : body
                    };
                } else if (type == "wait") {
                    return {
                        type: "wait",
                        title: title == undefined ? "Loading" : title,
                        body: body == undefined ? "Please wait..." : body
                    };
                }
            };

            that.MessageParser = function (response, title) {
                var type = 'success', msg = "";
                var bodyOutputTypeEnable = false;
                // Generate Message depends on Status
                if (response.data.code == 1) {
                    msg = response.data.message;
                }else {
                    type = 'error';
                    // Message From BackEnd
                    msg = response.data.message;
                    if (angular.isDefined(response.data.details)) {
                        var details = response.data.details;
                        msg = "";
                        for(var i=0; i<details.length; i++){
                            if(msg != ""){
                                bodyOutputTypeEnable = true;
                                msg += details[i] + "<br/>";
                            } else {
                                msg += details[i];
                            }
                        }
                    }
                }
                
                var result = {
                    //type: (angular.isDefined(force_type) && force_type == "") ? type : force_type,
                    type: type,
                    title: (title == undefined || title == null) ? type.toLowerCase() : title,
                    status: response.status,
                    body: msg
                };
                
                if(bodyOutputTypeEnable){
                    result.bodyOutputType = "trustedHtml";
                }
                
                return result;
            };

            that.ToasterMessage = function (data) {
                var toasterID = 1;
                if (data.type == "error") {
                    //toasterID = 2;
                }
                var toasterObj = {
                    type: data.type,
                    title: data.title,
                    body: data.body,
                    toasterId: toasterID
                };
                if (data.toastId != undefined) {
                    toasterObj.toastId = data.toastId;
                }
                if (data.timeout != undefined) {
                    toasterObj.timeout = data.timeout;
                }
                if (data.bodyOutputType != undefined) {
                    toasterObj.bodyOutputType = data.bodyOutputType;
                    //toasterObj.bodyOutputType = "trustedHtml";
                }
                toaster.pop(toasterObj);
                return toasterObj;
                //toaster.pop(data.type, data.title, data.body, toasterId: toasterID);
                //toaster.pop('success', "title", '<ul><li>Render html</li></ul>', 5000, 'trustedHtml');
            };

            that.DestroyToasterByID = function (toasterID, toastId) {
                toaster.clear(toasterID, toastId);
            };

            that.DestroyToasterByObj = function (data) {
                toaster.clear(data.toasterId, data.toastId);
            };

            that.WatingMessage = function (title, body) {
                var date = new Date();
                var dateInMilliseconds = date.getTime();
                // get message obj
                var resultObj = that.getMessageObj("wait", title, body);
                resultObj.toastId = dateInMilliseconds;
                resultObj.timeout = 3600 * 1000; // 1 hour
                return that.ToasterMessage(resultObj);
            }
            
            /* ALERT */
            that.AlertMessage = function (scope, data) {
                if (data.type == 'error') {
                    data.type = 'danger';
                }
                scope.alerts.push({
                    type: data.type,
                    msg: data.body
                });
            };
        });
