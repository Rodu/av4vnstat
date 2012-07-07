/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 07/07/12
 * Time: 14:01
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.controller.NavigationController = function ($scope) {
    'use strict';
    var SHOWN_CSS_CLASS = 'show',
        HIDDEN_CSS_CLASS = 'hide',

        visibleSection = 'home',
        visibleChart = '';


    $scope.test = "test";

    $scope.section = {
        home: {visible:SHOWN_CSS_CLASS},
        basic: {visible:HIDDEN_CSS_CLASS},
        advanced: {visible:HIDDEN_CSS_CLASS}
    };

    $scope.chart = {};

    $scope.showSection = function (id) {
        //$scope.chart[visibleChart].visible = HIDDEN_CSS_CLASS;
        $scope.section[visibleSection].visible = HIDDEN_CSS_CLASS;

        $scope.section[id].visible = SHOWN_CSS_CLASS;
        visibleSection = id;
    };

    $scope.showChart = function (id) {
        $scope.chart[visibleChart].visible = HIDDEN_CSS_CLASS;
        $scope.chart[id].visible = SHOWN_CSS_CLASS;

        visibleChart = id;
    };
};
