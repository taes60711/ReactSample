
import TwiceComponent from "../TwicComponent/TwiceComponent";
import { IMyComponentProps } from "./IMyComponentProps";


function MyComponent(props: IMyComponentProps) {
    console.log("MyComponent")
    const Click = () => {
        props.setName("MyComponent");
    }

    return (
        <div>
            <br></br>
            <div>{"MyComponent:  " + props.name}</div>
            <button onClick={Click}>MyComponents</button>
            <br></br>
            <TwiceComponent name={props.name} setName={props.setName}></TwiceComponent>
        </div>
    );
}

export default MyComponent;