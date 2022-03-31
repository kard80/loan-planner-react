import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { Dialog, Link, Pane, Text, TextInput } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from '../../lang/thai';
import { toasterCustom } from '../toaster/toaster';

import '../../services/firebase';
import './login.less';

type property = {
    isShown: boolean,
    setIsShown: Dispatch<SetStateAction<boolean>>,
}

export default function Login({isShown, setIsShown}: property) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toasterCustom.success(Alert.LOGIN_SUCCESS);
            setIsShown(false);
        }
        catch (err) {
            toasterCustom.danger(Alert.LOGIN_FAILED);
        }
    }

    const onClickRegister = (close: () => void) => {
        navigate('/register', {replace: true});
        close();
    }

    return (
        <Dialog
            isShown={isShown}
            title='Login'
            onCloseComplete={() => setIsShown(false)}
            hasCancel={false}
            shouldCloseOnOverlayClick={false}
            onConfirm={signIn}
        >
            {({ close }) => (
            <Pane className='login-container' display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='130px'>
                <Pane className='login-content' display='flex' flexDirection='column' justifyContent='space-between'>
                    <Pane display='flex' flexDirection='column'>
                        <Text size={300}>Username</Text>
                        <TextInput onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </Pane>
                    <Pane display='flex' flexDirection='column'>
                        <Text size={300}>Password</Text>
                        <TextInput type='password' onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                        <Link cursor='pointer' onClick={() => onClickRegister(close)} size={300}>Register</Link>
                    </Pane>
                </Pane>
            </Pane>
            )}
    </Dialog>
    )
}