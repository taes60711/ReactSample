import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { UserInputContainer } from '../UserInputContainer/UserInputContainer';
import { ISignInProps } from '../SignIn/ISignInProps';

export function SignUp(props: ISignInProps) {

    return (
        <div>
            <div className="Container">
                {/* 一般的な登録コンテナ */}
                <UserInputContainer mode={'register'} setLoading={props.setLoading} />

                {/* 外部登録コンテナ */}
                <div className='otherTitle'>他のアカウントでログイン</div>
                <div className='otherSignContainer'>
                    <div className='otherSignButton' onClick={()=>{console.log("Google")}}>
                        <FaGoogle size={20} color={'#ccc'} style={{ paddingRight: 10 }} />
                        ログイン
                    </div>
                    <div className='otherSignButton'onClick={()=>{console.log("Twitter")}}>
                        <FaTwitter size={20} color={'#ccc'} style={{ paddingRight: 10 }} />
                        ログイン
                    </div>
                </div>
            </div>
        </div>
    );
}
