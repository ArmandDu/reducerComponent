// @flow
import * as React from "react";

type State = any;
type Action = {type: string, payload?: any};

type Reducer = (state: State, action: Action, props: Object) => State;
type ReducerCreator = (actionTypes: Object) => Reducer;

type Props = {
    initialState: (p: Object) => Object | Object;
    actionTypes: Array<string>,
    reducerCreator: ReducerCreator,
    storeName: string,

    children: ({send: Function, actionTypes: Object}) => React.Node,
};


export class ReducerComponent extends React.Component<Props, State> {

    static defaultProps = {
        storeName: "state"
    };

    enumActionTypes: Object;
    reducer: Reducer;


    constructor(props: Props) {
        super(props);

        const { initialState, actionTypes, reducerCreator } = props;

        this.enumActionTypes = actionTypes.reduce((acc, actionType) => ({...acc, [actionType]: actionType}), {});
        this.reducer = reducerCreator(this.enumActionTypes);
        this.state = typeof initialState === "function" ? initialState(props) : initialState;
    }

    dispatch = (action: Action) => {
        this.setState((prevState, props) => this.reducer(prevState, action, props));
    };

    send = (type: string, payload?: any) => this.dispatch({type, payload});

    render() {
        const { storeName, children } = this.props;

        return children({send: this.send, actionTypes: this.enumActionTypes, [storeName]: this.state});
    }
}

export default ReducerComponent;