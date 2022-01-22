import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { Dialog, Pane, Text, TextInput } from 'evergreen-ui';
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

    return (
        <Dialog
            isShown={isShown}
            title='Login'
            onCloseComplete={() => setIsShown(false)}
            hasCancel={false}
            shouldCloseOnOverlayClick={false}
            onConfirm={signIn}
        >
            <Pane className='login-container' display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='120px'>
                <Pane className='login-content' display='flex' flexDirection='column' justifyContent='space-between'>
                    <Pane display='flex' flexDirection='column'>
                        <Text size={300}>Username</Text>
                        <TextInput onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </Pane>
                    <Pane display='flex' flexDirection='column'>
                        <Text size={300}>Password</Text>
                        <TextInput type='password' onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </Pane>
                </Pane>
            </Pane>
    </Dialog>
    )
}