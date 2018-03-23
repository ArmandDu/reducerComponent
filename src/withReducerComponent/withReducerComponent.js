//@flow
import * as React from "react";
import ReducerComponent from "../reduceComponent/ReduceComponent";
import type {InitialState, ReducerCreator} from "../reduceComponent/ReduceComponent";


export const withReducerComponent = <T, State>(actionTypes: Array<T>, reducerCreator: ReducerCreator<T, State>, initialState : InitialState<State>, storeName: string ="state"): Function => (WrappedComponent): React.ComponentType<*> => {


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