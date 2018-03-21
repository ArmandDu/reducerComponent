import React from "react";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withReducerComponent, {withReducerComponent as namedImport} from "../src/withReducerComponent/withReducerComponent";

const { expect } = require("chai");

Enzyme.configure({ adapter: new Adapter() });


describe("withReducerComponent", () => {

    describe("import", () => {
        it("should be able to load default module from src", () => {
            expect(withReducerComponent).not.to.equal("null");
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
    const initialStateFunc = (props) => ({changed: false, custom: props.custom});
    const enhance = withReducerComponent(actionTypes, reducerCreator, initialState);
    const enhance2 = withReducerComponent(actionTypes, reducerCreator, initialStateFunc);

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

        it("should return a HoC", () => {
            const hoc = enhance(() => {});
            expect(hoc).to.be.a("function");
        });

    });

    describe("reducerComponent", () => {
        it("should be able to pass state prop", (done) => {

            const component = (props) => {
                expect(props).to.have.property("state").with.property("changed").with.equal(false);
                done();
                return null;
            };

            const Hoc = enhance(component);
            const wrapper = shallow(<Hoc />);
            wrapper.render();

        });

        it("should be able to pass state prop when initialState is a function", (done) => {

            const component = (props) => {
                expect(props).to.have.property("state").with.property("changed").with.equal(false);
                done();
                return null;
            };

            const Hoc = enhance2(component);
            const wrapper = shallow(<Hoc />);
            wrapper.render();

        });
        it("should be able to pass state prop when initialState is a function with good values", (done) => {

            const component = (props) => {
                expect(props).to.have.property("state").with.property("custom").with.equal(1);
                done();
                return null;
            };

            const Hoc = enhance2(component);
            const wrapper = shallow(<Hoc custom={1} />);
            wrapper.render();

        });

        it("should have good displayName", () => {
            const Component = () => {};
            const Hoc = enhance(Component);

            expect(Hoc.displayName).to.equal("WithReducerComponent(Component)");
        });

        it("should be able to pass actionTypes prop", (done) => {
            const component = (props) => {
                expect(props).to.have.property("actionTypes").with.property("ACTION").with.equal("ACTION");
                done();
                return null;
            };

            const Hoc = enhance(component);
            const wrapper = shallow(<Hoc />);
            wrapper.render();
        });

        it("should be able to pass send prop", (done) => {
            const component = (props) => {
                expect(props).to.have.property("send").with.a("function");
                done();
                return null;
            };

            const Hoc = enhance(component);
            const wrapper = shallow(<Hoc />);
            wrapper.render();
        });

        it("should be able to pass props down to wrapped component", (done) => {
            const component = (props) => {
                expect(props).to.have.property("myProp").with.equal(true);
                done();
                return null;
            };

            const Hoc = enhance(component);
            const wrapper = shallow(<Hoc myProp />);
            wrapper.render();
        });

        it("should have state in reducer function", (done) => {
            const component = (props) => {
                props.send("SOME_ACTION");
                return null;
            };

            const creator = () => (state) => {
                expect(state).to.be.an("object").with.property("changed").with.equal(false);
                done();
                return state;
            };

            const Hoc = withReducerComponent(actionTypes, creator, initialState)(component);
            const wrapper = shallow(<Hoc />);
            wrapper.shallow().render();
        });

        it("should have action in reducer function", (done) => {
            const component = (props) => {
                props.send("SOME_ACTION");
                return null;
            };

            const creator = () => ({}, action) => {
                expect(action).to.be.an("object").with.property("type").with.equal("SOME_ACTION");
                done();
                return state;
            };

            const Hoc = withReducerComponent(actionTypes, creator, initialState)(component);
            const wrapper = shallow(<Hoc />);
            wrapper.shallow().render();
        });

        it("should have props in reducer function", (done) => {
            const component = (props) => {
                props.send("SOME_ACTION");
                return null;
            };

            const creator = () => ({}, {}, props) => {
                expect(props).to.be.an("object").with.property("aProp").with.equal(true);
                done();
                return state;
            };

            const Hoc = withReducerComponent(actionTypes, creator, initialState)(component);
            const wrapper = shallow(<Hoc aProp />);
            wrapper.shallow().render();
        });

    });

});