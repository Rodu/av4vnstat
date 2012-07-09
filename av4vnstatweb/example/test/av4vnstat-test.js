/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 08/07/12
 * Time: 14:35
 * To change this template use File | Settings | File Templates.
 */
describe("BasicChartControllerTest", function () {

    var controller;
    var scope;
    var VISIBILITY = RODU.av4vnstat.CONFIG.VISIBILITY;

    beforeEach(function () {
        scope = {};
        controller = new RODU.av4vnstat.controller.BasicChartController(scope);
    });

    it("Should instantiate the controller", function () {
        expect(typeof controller).toEqual('object');
    }); //*/

    describe("When description is shown", function () {
        it("Should have description visibility set to SHOW", function () {
            scope.showDescription();

            expect(scope.chart.description.visible).toEqual(VISIBILITY.SHOW);
        });
    });

    describe("When HourlyChart is shown", function () {
        it("Should have HourlyChart visibility set to SHOW", function () {
            // Simulating bound because test automation fails with Highchart in the way... :/
            scope.chart.hourlyChart.bound = true;

            scope.showHourlyChart();

            expect(scope.chart.hourlyChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
    
    describe("When DailyChart is shown", function () {
        it("Should have DailyChart visibility set to SHOW", function () {
            // Simulating bound because test automation fails with Highchart in the way... :/
            scope.chart.dailyChart.bound = true;

            scope.showDailyChart();

            expect(scope.chart.dailyChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
    
    describe("When MonthlyChart is shown", function () {
        it("Should have MonthlyChart visibility set to SHOW", function () {
            // Simulating bound because test automation fails with Highchart in the way... :/
            scope.chart.monthlyChart.bound = true;

            scope.showMonthlyChart();

            expect(scope.chart.monthlyChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
    
    describe("When TopTenChart is shown", function () {
        it("Should have TopTenChart visibility set to SHOW", function () {
            // Simulating bound because test automation fails with Highchart in the way... :/
            scope.chart.topTenChart.bound = true;

            scope.showTopTenChart();

            expect(scope.chart.topTenChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
});
/**
 * Created with JetBrains WebStorm.
 * User: rob
 * Date: 08/07/12
 * Time: 14:35
 * To change this template use File | Settings | File Templates.
 */
describe("SectionControllerTest", function () {

    var sectionController;
    var scope;
    var VISIBILITY = RODU.av4vnstat.CONFIG.VISIBILITY;

    beforeEach(function () {
        scope = {};
        sectionController = new RODU.av4vnstat.controller.SectionController(scope);
    });

    it("Should instantiate the controller", function () {
        expect(typeof sectionController).toEqual('object');
    }); //*/

    describe("When Home section is shown", function () {

        it("Should have Home set to SHOW", function () {
            scope.showHome();

            expect(scope.section.home.visible).toEqual(VISIBILITY.SHOW);
        });

        it("Should have the other sections set to HIDE", function () {
            scope.showHome();

            expect(scope.section.basic.visible).toEqual(VISIBILITY.HIDE);
            expect(scope.section.advanced.visible).toEqual(VISIBILITY.HIDE);
        }); //*/
    });

    describe("When Basic section is shown", function () {

        it("Should have Basic set to SHOW", function () {
            scope.showBasic();

            expect(scope.section.basic.visible).toEqual(VISIBILITY.SHOW);
        });

        it("Should have the other sections set to HIDE", function () {
            scope.showBasic();

            expect(scope.section.home.visible).toEqual(VISIBILITY.HIDE);
            expect(scope.section.advanced.visible).toEqual(VISIBILITY.HIDE);
        }); //*/
    });

    describe("When Advanced section is shown", function () {

        it("Should have Advanced set to SHOW", function () {
            scope.showAdvanced();

            expect(scope.section.advanced.visible).toEqual(VISIBILITY.SHOW);
        });

        it("Should have the other sections set to HIDE", function () {
            scope.showAdvanced();

            expect(scope.section.home.visible).toEqual(VISIBILITY.HIDE);
            expect(scope.section.basic.visible).toEqual(VISIBILITY.HIDE);
        }); //*/
    });


});
