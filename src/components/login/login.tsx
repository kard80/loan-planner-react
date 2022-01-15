import { Dispatch, SetStateAction } from 'react';
import { Dialog, Pane, Text, TextInput } from 'evergreen-ui';

import './login.less';

type property = {
    isShown: boolean,
    setIsShown: Dispatch<SetStateAction<boolean>>
}

export default function Login({isShown, setIsShown}: property) {
    return (
        <Dialog
        isShown={isShown}
        title='Login'
        onCloseComplete={() => setIsShown(false)}
        hasCancel={false}
        shouldCloseOnOverlayClick={false}
        >
            <Pane className='login-container' display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='120px'>
                <Pane className='login-content' display='flex' flexDirection='column' justifyContent='space-between'>
                    <Pane display='flex' flexDirection='column'>
                        <Text size={300}>Username</Text>
                        <TextInput />
                    </Pane>
                    <Pane display='flex' flexDirection='column'>
                        <Text size={300}>Password</Text>
                        <TextInput />
                    </Pane>
                </Pane>
            </Pane>
    </Dialog>
    )
}