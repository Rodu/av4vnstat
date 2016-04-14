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

    describe("When description is shown after more switches", function () {
        beforeEach(function () {
            scope.showDailyChart();
            scope.showMonthlyChart();
            scope.showTopTenChart();
            scope.showDescription();
        });
        
        it("Should have description visibility set to SHOW", function () {
            expect(scope.chart.description.visible).toEqual(VISIBILITY.SHOW);
        });
        
        it("Should have hourlyChart set to HIDE", function () {
            expect(scope.chart.hourlyChart.visible).toEqual(VISIBILITY.HIDE);
        });
        
        it("Should have dailyChart to HIDE", function () {
            expect(scope.chart.dailyChart.visible).toEqual(VISIBILITY.HIDE);
        });
            
        it("Should have monthlyChart set to HIDE", function () {
            expect(scope.chart.monthlyChart.visible).toEqual(VISIBILITY.HIDE);
        });
            
        it("Should have topTenChart set to HIDE", function () {
            expect(scope.chart.topTenChart.visible).toEqual(VISIBILITY.HIDE);
        });
    });

    describe("When HourlyChart is shown after more switches", function () {
        beforeEach(function () {
            scope.showDailyChart();
            scope.showMonthlyChart();
            scope.showTopTenChart();
            scope.showDescription();
            scope.showHourlyChart();
        });
        
        it("Should have HourlyChart visibility set to SHOW", function () {
            expect(scope.chart.hourlyChart.visible).toEqual(VISIBILITY.SHOW);
        });
        
        it("Should have description set to HIDE", function () {
            expect(scope.chart.description.visible).toEqual(VISIBILITY.HIDE);
        });
        
        it("Should have dailyChart to HIDE", function () {
            expect(scope.chart.dailyChart.visible).toEqual(VISIBILITY.HIDE);
        });
            
        it("Should have monthlyChart set to HIDE", function () {
            expect(scope.chart.monthlyChart.visible).toEqual(VISIBILITY.HIDE);
        });
            
        it("Should have topTenChart set to HIDE", function () {
            expect(scope.chart.topTenChart.visible).toEqual(VISIBILITY.HIDE);
        });
    });
    
    describe("When DailyChart is shown", function () {
        it("Should have DailyChart visibility set to SHOW", function () {
            scope.showDailyChart();
            
            expect(scope.chart.dailyChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
    
    describe("When MonthlyChart is shown", function () {
        it("Should have MonthlyChart visibility set to SHOW", function () {
            scope.showMonthlyChart();
            
            expect(scope.chart.monthlyChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
    
    describe("When TopTenChart is shown", function () {
        it("Should have TopTenChart visibility set to SHOW", function () {
            scope.showTopTenChart();

            expect(scope.chart.topTenChart.visible).toEqual(VISIBILITY.SHOW);
        });
    });
});
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

    describe("When Home section is shown after more transitions", function () {
        beforeEach(function () {
            scope.showBasic();
            scope.showAdvanced();
            scope.showHome();
        });
        
        it("Should have Home set to SHOW", function () {
            expect(scope.section.home.visible).toEqual(VISIBILITY.SHOW);
        });

        it("Should have basic set to HIDE", function () {
            expect(scope.section.basic.visible).toEqual(VISIBILITY.HIDE);
        });
        
        it("Should have advanced set to HIDE", function () {
            expect(scope.section.advanced.visible).toEqual(VISIBILITY.HIDE);
        }); //*/
    });

    describe("When Basic section is shown", function () {
        it("Should have Basic set to SHOW", function () {
            scope.showBasic();

            expect(scope.section.basic.visible).toEqual(VISIBILITY.SHOW);
        });
    });

    describe("When Advanced section is shown", function () {
        it("Should have Advanced set to SHOW", function () {
            scope.showAdvanced();

            expect(scope.section.advanced.visible).toEqual(VISIBILITY.SHOW);
        });
    });
});
