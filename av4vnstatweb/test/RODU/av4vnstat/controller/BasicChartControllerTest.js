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
    var VISIBILITY = RODU.av4vnstat.constants.VISIBILITY;

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

            scope.showMonthlyChartChart();

            expect(scope.chart.monthlyChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
});
