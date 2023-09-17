
import "../SignIn/SignIn.scss";
import { ISignInProps } from './ISignInProps';
import { UserInputContainer } from '../UserInputContainer/UserInputContainer';


export function SignIn(props: ISignInProps) {
    return (
        <div>
            <div className="Container">
                <UserInputContainer setLoading={props.setLoading} mode={'signIn'} />
            </div>
        </div>
    );
}



