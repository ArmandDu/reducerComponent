// @flow
import * as React from "react";

type Action = {type: string, payload?: *};

export type ReducerCreator<T, State> = (actionTypes: {[T]: T}) => Reducer<State>;
export type InitialState<State> = State | (props: any) => State;

type Reducer<State> = (state: State, action: Action, props: Object) => State;
type Send<T> = (type: T, payload?: any)=>void;

type Props<T, State> = {
    initialState: InitialState<State>;
    actionTypes: Array<T>,
    reducerCreator: ReducerCreator<T, State>,
    storeName: string,

    children: ({send: Send<T>, actionTypes: {[T]: T}}) => React.Node,
};


export class ReducerComponent<T: string, State> extends React.Component<Props<T, State>, State> {

    static defaultProps = {
        storeName: "state"
    };

    enumActionTypes: Object;
    reducer: Reducer<State>;


    constructor(props: Props<T, State>) {
        super(props);

        const { initialState, actionTypes, reducerCreator } = props;

        this.enumActionTypes = actionTypes.reduce((acc, actionType) => ({...acc, [actionType]: actionType}), {});
        this.reducer = reducerCreator(this.enumActionTypes);
        this.state = typeof initialState === "function" ? initialState(props) : initialState;
    }

    dispatch = (action: Action) => {
        this.setState((prevState, props) => this.reducer(prevState, action, props));
    };

    send: Send<T> = (type, payload) => this.dispatch({type, payload});

    render() {
        const { storeName, children } = this.props;

        return children({send: this.send, actionTypes: this.enumActionTypes, [storeName]: this.state});
    }
}

export default ReducerComponent;