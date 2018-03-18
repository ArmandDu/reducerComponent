import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReducerComponent, { ReducerComponent as namedImport} from "../src/reduceComponent/ReduceComponent";

const { expect } = require("chai");

Enzyme.configure({ adapter: new Adapter() });


describe("ReducerComponent", () => {

    describe("import", () => {
        it("should be able to load default module from src", () => {
            expect(ReducerComponent).not.to.equal("null");
        });
        it("should be able to load named module from src", () => {
            expect(namedImport).not.to.equal("null");
        })

    });

    const actionTypes = ["ACTION"];
    const reducerCreator = ({ACTION}) => (state, action) => {

        switch (action.type) {
            case ACTION:
                return {changed: true};
            default: return state
        }
    };
    const initialState = {changed: false};

    describe("initial values", () => {
        it("should have correct actiontype", () => {
            expect(actionTypes).to.be.a("array");
        });

        it("should return a function", () => {

            const reducer = reducerCreator(actionTypes);

            expect(reducer).to.be.a("function");
        });

        it("should have correct initialState", () => {
            expect(initialState).to.have.property('changed').with.equal(false);
        });

    });

    describe("with component", () => {
        it("should be able to pass state prop", (done) => {

            const Component = () => {
                return (

                    <ReducerComponent actionTypes={actionTypes} reducerCreator={reducerCreator} initialState={initialState}>
                        {(props) => {
                            expect(props).to.have.property("state").with.property("changed").with.equal(false);
                            done();
                            return null;
                        }}
                    </ReducerComponent>
                )
            };

            const wrapper = shallow(<Component />);
            wrapper.render();

        });

        it("should be able to pass actionTypes prop", (done) => {
            const Component = () => {
                return (

                    <ReducerComponent actionTypes={actionTypes} reducerCreator={reducerCreator} initialState={initialState}>
                        {(props) => {
                            expect(props).to.have.property("actionTypes").with.property("ACTION").with.equal("ACTION");
                            done();
                            return null;
                        }}
                    </ReducerComponent>
                )
            };

            const wrapper = shallow(<Component />);
            wrapper.render();
            });

        it("should be able to pass send prop", (done) => {

            const Component = () => {
                return (

                    <ReducerComponent actionTypes={actionTypes} reducerCreator={reducerCreator} initialState={initialState}>
                        {(props) => {
                            expect(props).to.have.property("send").with.a("function");
                            done();
                            return null;
                        }}
                    </ReducerComponent>
                )
            };

            const wrapper = shallow(<Component />);
            wrapper.render();
        });

    });

});