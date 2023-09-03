import { ITwiceComponentProps } from "./ITwiceComponentProps";


function TwiceComponent(props: ITwiceComponentProps) {

    const Click = () => {
        props.setName("TwiceComponent");
    }

    return (
        <div>
            <br></br>
            <div>{"TwiceComponent:  " + props.name}</div>
            <button onClick={Click}>TwiceComponent</button>
        </div>
    );
}

export default TwiceComponent;