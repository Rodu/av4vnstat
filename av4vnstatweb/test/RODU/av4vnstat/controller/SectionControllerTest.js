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
