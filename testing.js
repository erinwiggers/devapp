function screenshotTestingApp() {
    'use strict'
    var testingData = require('./testing.json'),
        opn = require('opn'),
        express = require('express'),
        app = express(),
        username = testingData.username,
        authkey = testingData.authkey,
        password = testingData.password,
        screenshotApi = "https://" + username + ":" + authkey + "@" + testingData.apis.screenshot + testingData.optionQueries.screenshot,
        comparisonApi = "https://" + username + ":" + authkey + "@" + testingData.apis.comparison,
        livetestApi = "https://" + username + ":" + authkey + "@" + testingData.apis.livetests,
        googleSheetsApi = testingData.apis.sheets,
        browser_list = testingData.options.browser_list,
        test_page = testingData.pages.home;

    function _ajax_request(url, data, callback, type, method) {
        if (jQuery.isFunction(data)) {
            callback = data;
            data = {};
        }
        return jQuery.ajax({
            type: method,
            url: url,
            data: data,
            success: callback,
            dataType: type
        });
    }

    jQuery.extend({
        put: function (url, data, callback, type) {
            return _ajax_request(url, data, callback, type, 'PUT');
        },
        delete_: function (url, data, callback, type) {
            return _ajax_request(url, data, callback, type, 'DELETE');
        }
    });

    // Post to Screenshot API to Start Test
    var startScreenshotTest = function () {

    }

    var showResults = function (response) {
        var getTestId = function () {
            return response.screenshot_test_id;
        };
        var getTestVersion = function () {
            return response.versions.version_id;
        };
        var testId = getTestId(),
            testVersion = getTestVersion(),
            resultsURL = testingData.baseURL.screenshot + "/" + testId + "/" + testVersion + testingData.queries.screenshot;
        opn(resultsURL, { app: 'Chrome' });
    };

    startScreenshotTest();
    showResults();

}

screenshotTestingApp();