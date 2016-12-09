'use strict';


angular.module('PAELLAWeb').filter('startFrom', function () {
    return function (input, start) {
        if (input.length) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    };
});
// -------------------------------------------------- //
// -------------------------------------------------- //
// http://www.bennadel.com/blog/2632-creating-asynchronous-alerts-prompts-and-confirms-in-angularjs.htm
// I define an asynchronous wrapper to the native alert() method. It returns a
// promise that will be resolved in a future tick of the event loop.
// --
// NOTE: This promise will never be "rejected" since there is no divergent
// behavior available to the user with the alert() method.
angular.module('PAELLAWeb').factory("alert", function ($window, $q) {
    // Define promise-based alert() method.
    function alert(message) {
        var defer = $q.defer();
        $window.alert(message);
        defer.resolve();
        return(defer.promise);
    }
    return(alert);
});
// http://www.bennadel.com/blog/2632-creating-asynchronous-alerts-prompts-and-confirms-in-angularjs.htm
// I define an asynchronous wrapper to the native prompt() method. It returns a
// promise that will be "resolved" if the user submits the prompt; or will be
// "rejected" if the user cancels the prompt.
angular.module('PAELLAWeb').factory("prompt", function ($window, $q) {
    // Define promise-based prompt() method.
    function prompt(message, defaultValue) {
        var defer = $q.defer();
        // The native prompt will return null or a string.
        var response = $window.prompt(message, defaultValue);
        if (response === null) {
            defer.reject();
        } else {
            defer.resolve(response);
        }
        return(defer.promise);
    }
    return(prompt);
});
// http://www.bennadel.com/blog/2632-creating-asynchronous-alerts-prompts-and-confirms-in-angularjs.htm
// I define an asynchronous wrapper to the native confirm() method. It returns a
// promise that will be "resolved" if the user agrees to the confirmation; or
// will be "rejected" if the user cancels the confirmation.
angular.module('PAELLAWeb').factory("confirm", function ($window, $q) {
    // Define promise-based confirm() method.
    function confirm(message) {
        var defer = $q.defer();
        // The native confirm will return a boolean.
        if ($window.confirm(message)) {
            defer.resolve(true);
        } else {
            defer.reject(false);
        }
        return(defer.promise);
    }
    return(confirm);
});
// http://stackoverflow.com/questions/26657160/make-a-negative-number-appear-positive-but-maintain-actual-value
angular.module('PAELLAWeb').filter('positiveNumber', function () {
    return function (input) {
        if (!input) {
            return 0;
        }

        return Math.abs(input);
    };
});

angular.module('PAELLAWeb').filter("trustedhtml",function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    });

angular.module('PAELLAWeb').filter('charlimit', function () {
    return function (value, wordwise, max, tail) {
        if (!value)
            return '';

        max = parseInt(max, 10);
        if (!max)
            return value;
        if (value.length <= max)
            return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) == '.' || value.charAt(lastspace - 1) == ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});
