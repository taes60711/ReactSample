import React, { useState } from 'react';
import { IMyComponent } from './IMyComponent';

function MyComponent(props: IMyComponent) {

    const Click = () => {
        props.setName("MyComponent");
        console.log('My Component');
    }

    return (
        <div>
            <br></br>
            <div>{"MyComponent:  " + props.name}</div>
            <button onClick={Click}>MyComponents</button>
        </div>
    );
}

export default MyComponent;