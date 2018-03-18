//@flow
import React from "react";
import ReducerComponent from "../reduceComponent/ReduceComponent";

type State = any;
type Action = {type: String, payload?: Object};

type ReducerCreator = (actionTypes: Object) => (state: State, action: Action) => State;

export const withReducerComponent = (actionTypes: Array<string>, reducerCreator: ReducerCreator, initialState : Object | Function, storeName: string ="state"): Function => (WrappedComponent): Function => {


    const WithReducerComponent = (props) => {

        const renderProp = (injectedProps) => <WrappedComponent {...injectedProps} {...props} />;

        return <ReducerComponent initialState={initialState}
                                 actionTypes={actionTypes}
                                 reducerCreator={reducerCreator}
                                 storeName={storeName}
                                 {...props}
                                 children={renderProp}/>;

    };

    WithReducerComponent.displayName = `WithReducerComponent(${getDisplayName(WrappedComponent)})`;
    return WithReducerComponent;
};

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};


export default withReducerComponent;