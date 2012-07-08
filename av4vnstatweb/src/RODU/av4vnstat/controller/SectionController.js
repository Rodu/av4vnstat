/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 07/07/12
 * Time: 14:01
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.controller.SectionController = function ($scope) {
    'use strict';
    var SHOW = 'block',
        HIDE = 'none',

        visibleSection = 'home',

        show = function (id) {
            $scope.section[visibleSection].visible = HIDE;
            $scope.section[id].visible = SHOW;
            visibleSection = id;
        };


    $scope.test = "test";

    $scope.section = {
        home: {visible:SHOW},
        basic: {visible:HIDE},
        advanced: {visible:HIDE}
    };


    $scope.showHome = function () {
        show('home');
    };

    $scope.showBasic = function () {
        show('basic');
    };

    $scope.showAdvanced = function () {
        show('advanced');
    };


};
