"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("../src/api/v1/middleware/validate");
const branchSchema_1 = require("../src/api/v1/schemas/branchSchema");
/**
 * Test suite for validating the `Branch` data using the `validate` function.
 * This suite verifies that the `validate` function correctly handles valid and invalid `Branch` data.
 *
 * @group Validation
 */
describe("validate function for A data complete", () => {
    /**
  * Test that ensures the validation function does not throw an error for valid `Branch` data.
  *
  * @test {validate}
  */
    it("should not throw an error for valid item data", () => {
        const data = {
            id: "1",
            name: "John Brown",
            address: "Canada",
            phone: "+1234567890"
        };
        expect(() => (0, validate_1.validate)(branchSchema_1.branchSchema, data)).not.toThrow();
    });
    /**
   * Test that ensures the validation function throws an error for missing `name` field in `Branch` data.
   *
   * @test {validate}
   */
    it("should throw an error for missing name", () => {
        const data = {
            id: "1",
            address: "Canada",
            phone: "+1234567890"
        };
        expect(() => (0, validate_1.validate)(branchSchema_1.branchSchema, data)).toThrow("Validation error: Name is required");
    });
});
//# sourceMappingURL=branchValidate.test.js.map