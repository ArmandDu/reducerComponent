import module, {withReducerComponent, ReducerComponent} from "../src";

const { expect } = require("chai");

describe ("index", () => {
    it("should be able to load default module; withReducerComponent from src", () => {
        expect(module).not.to.equal("null");
    });
    it("should be able to load named module: withReducerComponent from src", () => {
        expect(withReducerComponent).not.to.equal("null");
    });
    it("should be able to load named module: ReducerComponent from src", () => {
        expect(ReducerComponent).not.to.equal("null");
    });
});