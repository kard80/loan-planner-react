import { Button, Label, Pane, TextInput } from "evergreen-ui";
import { ChangeEvent, useState } from "react";

import './register.less';

export default function Register() {
    const [email] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onInputChanged = (e: any) => {
        console.log(e);
    }

    return (
        <Pane className='register-container'>
            <Pane className='input-pane'>
                <Label className='input-label'>Email</Label>
                {/* <TextInput type='email' value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}></TextInput> */}
                <TextInput type='email' value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChanged(e)}></TextInput>
            </Pane>
            <Pane className='input-pane'>
                <Label className='input-label'>Confirm Email</Label>
                <TextInput type='email' value={confirmEmail} onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmEmail(e.target.value)}></TextInput>
            </Pane>
            <Pane className='input-pane'>
                <Label className='input-label'>Password</Label>
                <TextInput type='password' value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}></TextInput>
            </Pane>
            <Pane className='input-pane'>
                <Label className='input-label'>Confirm Password</Label>
                <TextInput type='password'value={confirmPassword} onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}></TextInput>
            </Pane>
            <Pane className='input-pane'>
                <Button appearance="primary">Submit</Button>
            </Pane>
        </Pane>
    )
}