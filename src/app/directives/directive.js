'use strict';

angular.module('PAELLAWeb').directive('minAllowableFontSize', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs) {
            function testNumber(number) {
                if (!isNaN(parseFloat(number)) && isFinite(number)) {
                    if (parseInt(number) < 6) {
                        number = 6;
                    }
                } else {
                    number = 6;
                }
                return number;
            }

            function onEffect() {
                var props = attrs.ngModel.split(".");
                if (props.length > 3) {
                    scope[props[0]][props[1]][props[2]][props[3]] = testNumber(scope[props[0]][props[1]][props[2]][props[3]]);
                } else if (props.length > 2) {
                    scope[props[0]][props[1]][props[2]] = testNumber(scope[props[0]][props[1]][props[2]]);
                } else if (props.length > 1) {
                    scope[props[0]][props[1]] = testNumber(scope[props[0]][props[1]]);  //[] equals to dot '.'
                } else {
                    scope[attrs.ngModel] = testNumber(scope[attrs.ngModel]);
                }
            }

            element.bind("change", function () {
                //console.log("Called change");
                scope.$apply(onEffect());
            });
            element.bind("blur", function () {
                //console.log("Called blur");
                scope.$apply(onEffect());
            });
        }
    };
});
angular.module('PAELLAWeb').directive('defaultImage', function ($http, $q) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(ngSrc) {
                var deferred = $q.defer();
                if(ngSrc === undefined){
                    deferred.resolve(false);
                    element.attr('src', 'assets/images/no_image.png'); // set default image
                } else {
                    console.log(ngSrc);
                    var image = new Image();
                    image.onerror = function () {
                        deferred.resolve(false);
                        element.attr('src', 'assets/images/no_image.png'); // set default image
                    };
                    image.onload = function () {
                        deferred.resolve(true);
                    };
                    image.src = ngSrc;
                }
                return deferred.promise;
            });
        }
    };
});
angular.module('PAELLAWeb').directive('positiveNumber', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs) {
            element.bind("change", function () {
                scope.testNumber = function (number) {
                    if (!isNaN(parseFloat(number)) && isFinite(number)) {
                        if (parseInt(number) < 0) {
                            number = 0;
                        }
                    } else {
                        number = 0;
                    }
                    return number;
                };
                scope.$apply(function () {
                    var props = attrs.ngModel.split(".");
                    if (props.length > 3) {
                        scope[props[0]][props[1]][props[2]][props[3]] = scope.testNumber(scope[props[0]][props[1]][props[2]][props[3]]);
                    } else if (props.length > 2) {
                        scope[props[0]][props[1]][props[2]] = scope.testNumber(scope[props[0]][props[1]][props[2]]);
                    } else if (props.length > 1) {
                        scope[props[0]][props[1]] = scope.testNumber(scope[props[0]][props[1]]);  //[] equals to dot '.'
                    } else {
                        scope[attrs.ngModel] = scope.testNumber(scope[attrs.ngModel]);
                    }
                });
            });
        }
    };
});
angular.module('PAELLAWeb').directive('onlyDigits', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            //scope, element, attrs;
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined)
                    return '';
                //console.log("inputValue :: " + inputValue);
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                //console.log(transformedInput);
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});
angular.module('PAELLAWeb').directive("blockSeparator", function () {
    return {
        restrict: 'E',
        template: '<div class="row"><div class="col-md-12">&nbsp;</div></div>'
    };
});
angular.module('PAELLAWeb').directive("topModuleArrow", function () {
    var template = '<div class="top_module_arrow"><div class="{{add_column}} modalframe"><div class="row">';
    template += '<div class="col-md-6 col-lg-offset-3 text-center"><img src="Web/resources/image/module_arrow.gif" alt="" /></div></div></div></div>';
    return {
        restrict: 'E',
        template: template,
        link: function (scope, element, attrs) {
            scope.add_column = "col-md-12 col-lg-12";
            var noOfCol = attrs.noOfCol;
            if (noOfCol == 12) {
                scope.add_column = 'col-md-12 col-lg-12';
            } else if (noOfCol == 10) {
                scope.add_column = 'col-md-offset-1 col-lg-offset-1 col-md-10 col-lg-10';
            } else if (noOfCol == 8) {
                scope.add_column = 'col-md-offset-2 col-lg-offset-2 col-md-8 col-lg-8';
            } else if (noOfCol == 6) {
                scope.add_column = 'col-md-offset-3 col-lg-offset-3 col-md-6 col-lg-6';
            } else if (noOfCol == 4) {
                scope.add_column = 'col-md-offset-4 col-lg-offset-4 col-md-4 col-lg-4';
            } else {
                scope.add_column = 'col-md-12 col-lg-12';
            }
        }
    };
});
angular.module('PAELLAWeb').directive('uploadfile', function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            element.bind('click', function (e) {
                angular.element(e.target).siblings('#upload').trigger('click');
            });
        }
    };
});
angular.module('PAELLAWeb').directive("dynamicName", function ($compile) {
    return {
        restrict: "A",
        terminal: true,
        priority: 1000,
        link: function (scope, element, attrs) {
            element.attr('name', scope.$eval(attrs.dynamicName));
            element.removeAttr("dynamic-name");
            $compile(element)(scope);
        }
    };
});
angular.module('PAELLAWeb').directive("dynamicTooltip", function ($compile) {
    return {
        restrict: "A",
        terminal: true,
        priority: 1000,
        link: function (scope, element, attrs) {
            if (attrs.dynamicTooltip !== null && angular.isDefined(attrs.dynamicTooltip) && attrs.dynamicTooltip !== "") {
                element.attr('tooltip', attrs.dynamicTooltip);
            }
            element.removeAttr("dynamic-tooltip");
            $compile(element)(scope);
        }
    };
});
angular.module('PAELLAWeb').directive("preventDefault", function () {
    var linkFn = function (scope, element) {
        angular.element(element).on("click", function (event) {
            event.preventDefault();
        });
    };
    return {
        restrict: 'A',
        link: linkFn
    }
});
angular.module('PAELLAWeb').directive('renderIframely', function ($timeout, $window) {
    return {
        link: function () {
            $timeout(function () {
                // Run code after element is rendered                        
                $window.iframely && iframely.load();
            }, 0, false);
        }
    };
});
