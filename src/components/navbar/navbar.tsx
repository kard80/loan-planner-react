import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../login/login';
import { Button, Heading } from 'evergreen-ui';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Alert } from '../../lang/thai';
import { toasterCustom } from '../toaster/toaster';
import { connect, RootStateOrAny } from 'react-redux';

import './navbar.less';

type props = {
    dispatch: Function
}


function Navbar({ dispatch }: props) {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [disableLoginBtn, setDisableLoginBtn] = useState(true);

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

    // Example how to use redux action
    // const showSpinner = () => {
    //     dispatch({ type: SHOW_SPINNER });
    // }

    useEffect(() => {
        if (!loginStatus) {
            setTimeout(() => {
                setDisableLoginBtn(false);
            }, 1000);
        }
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            setLoginStatus(!!user);
        })
    })

    return(
        <nav className={'navbar-container'}>
            <Link to='/'>
                <Heading className='navbar-header' onClick={() => {<Link to='/' />}}>Loan Planner</Heading>
            </Link>
            {loginStatus
                ? <Button onClick={onLogout}>Logout</Button>
                : <Button disabled={disableLoginBtn} onClick={() => setIsShown(true)}>Login</Button>}
            <Login isShown={isShown} setIsShown={setIsShown} />
        </nav>
    )
}

const mapStateToProps = (state: RootStateOrAny) => {
    return {
        showSpinner: state.showSpinner
    }
}

export default connect(mapStateToProps)(Navbar);