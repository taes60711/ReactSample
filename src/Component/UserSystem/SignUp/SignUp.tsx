import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { UserInputContainer } from '../UserInputContainer/UserInputContainer';

export function SignUp() {
    return (
        <div>
            <div className="Container">
                <UserInputContainer mode={'register'} setLoading={function (): void {} }/>

                <div className='otherTitle'>他のアカウントでログイン</div>
                <div className='otherSignContainer'>
                    <div className='otherSignButton'>
                        <FaGoogle size={20} color={'#ccc'} style={{ paddingRight: 10 }} />
                        ログイン
                    </div>
                    <div className='otherSignButton'>
                        <FaTwitter size={20} color={'#ccc'} style={{ paddingRight: 10 }} />
                        ログイン
                    </div>
                </div>
            </div>
        </div>
    );
}
