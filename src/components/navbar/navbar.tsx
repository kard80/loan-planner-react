import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../login/login';
import { Button, Heading } from 'evergreen-ui';
import { getAuth, signOut } from 'firebase/auth';
import { Alert } from '../../lang/thai';
import { toasterCustom } from '../toaster/toaster';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../services/firebase';
import './navbar.less';

export default function Navbar() {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!!user) {
            setIsShown(false);
        }
    }, [user])

    const onLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            toasterCustom.success(Alert.LOGOUT_SUCCESS);
            navigate('/', {replace: true});
        } catch (err) {
            toasterCustom.danger(Alert.LOGOUT_FAILED);
        }
    }

    return(
        <nav className={'navbar-container'}>
            <Link to='/'>
                <Heading className='navbar-header' onClick={() => {<Link to='/' />}}>Loan Planner</Heading>
            </Link>
            {!!user
                ? <Button onClick={onLogout}>Logout</Button>
                : <Button onClick={() => setIsShown(true)}>Login</Button>}
            <Login isShown={isShown} setIsShown={setIsShown} />
        </nav>
    )
}