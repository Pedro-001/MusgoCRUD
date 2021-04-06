const assert = require('assert')
const isRequestAjaxOrApi = require("../utils/isRequestAjaxOrApi")

describe("utils - isRequestAjaxOrApi", function () {
    describe("when req accepts html and is not an XMLHttpRequest", function () {
        it("Should return false", function () {
            const req =  {
                accepts: () => true,
                xhr: false
            };
            const result = isRequestAjaxOrApi(req);
            const expected = false;
            assert.strictEqual(result, expected);
        });
    });

    describe("when req doesnt accept html and its not and HMLHttpRequest", function () {
        it("should return true", function  () {
            const req = {
                accepts: () => false,
                xhr: false
            };

            const result = isRequestAjaxOrApi(req);
            const expected = true;

            assert.strictEqual(result, expected)
        });
    });

    describe("when req accepts html and its and XMLHttpRequest", function () {
        it("should return true", function () {
            const req = {
                accepts: () => true,
                xhr: true
            };

            const result = isRequestAjaxOrApi(req);
            const expected = true;

            assert.strictEqual(result, expected);
        });
    });
});