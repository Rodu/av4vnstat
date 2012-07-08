/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 07/07/12
 * Time: 14:01
 * To change this template use File | Settings | File Templates.
 */
RODU.av4vnstat.controller.SectionController = function ($scope) {
    'use strict';
    var visibleSection = 'home',
        VISIBILITY = RODU.av4vnstat.constants.VISIBILITY,

        show = function (id) {
            $scope.section[visibleSection].visible = VISIBILITY.HIDE;
            $scope.section[id].visible = VISIBILITY.SHOW;
            visibleSection = id;
        };


    $scope.test = "test";

    $scope.section = {
        home: {visible:VISIBILITY.SHOW},
        basic: {visible:VISIBILITY.HIDE},
        advanced: {visible:VISIBILITY.HIDE}
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
