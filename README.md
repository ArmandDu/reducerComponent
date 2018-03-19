# reducerComponent
A RenderProp Component and Higher Order Component function that implements the *reducerComponent* pattern in Read.


I wanted to implement this feature after playing with [ReasonReact](https://reasonml.github.io/reason-react/).

These functions are inspired by the [reducerComponent](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html) feature in ReasonReact.

This library provides two modules that does the same thing:

a Higher Order Function `withReducerComponent` and a RenderProp Component: `ReducerComponent`.
Both expect an initialState, a list of action types and a Reducer function creator

**This package has not been tested yet. Use with care.**

## install

```
npm install --save ArmandDu/reducerComponent
```

or 
```
npm install --save reducer-component
```


## Usage


### withReducerComponent
```
import React from 'react';
import {render} from 'react-dom';

import {withReducerComponent} from 'reducercomponent';


const Button = (props) => {

    return (
        <button onClick={() => props.send(props.actionTypes.CLICK)}>
            {props.state.clicked ? "Clicked" : "Click me!"}
        </button>
    )

};

const inititalState = { clicked: false };

const actionTypes = ["CLICK"];

const reducerCreator = (actionTypeEnum) => (state, action) => {
    switch (action.type) {
        case actionTypeEnum.CLICK:
            return {clicked: true};
        default: return state;
    }
};

const enhance = withReducerComponent(actionTypes, reducerCreator, inititalState);

const EnhancedButton = enhance(Button);

render(<EnhancedButton />, document.getElementById("root"));


```

### ReducerComponent
```
import React from 'react';
import {render} from 'react-dom';

import {ReducerComponent} from 'reducercomponent';


const Button = (props) => {


    const initialState = {clicked: false};
    const actionTypes = ["CLICK"];

    const reducerCreator = (actionTypeEnum) => (state, action) => {
        switch (action.type) {
            case actionTypeEnum.CLICK:
                return {clicked: true};
            default: return state;
        }
    };

    return (
        <ReducerComponent initialState={initialState} reducerCreator={reducerCreator} actionTypes={actionTypes} >
            {({state, send, actionTypes}) => {
                return (
                    <button onClick={() => send(actionTypes.CLICK)}>
                        {state.clicked ? "You Clicked" : `${props.name}! Click me!`}
                    </button>
                )
            }}
        </ReducerComponent>
    )

};

render(<Button name={"Hello"} />, document.getElementById("root"));

```

