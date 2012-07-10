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
