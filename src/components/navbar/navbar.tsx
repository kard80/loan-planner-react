import { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../login/login';
import { Button, Heading } from 'evergreen-ui';

import './navbar.less';

export default function Navbar() {
    const [isShown, setIsShown] = useState(false);
    return(
        <nav className={'navbar-container'}>
            <Link to='/'>
                <Heading className='navbar-header' onClick={() => {<Link to='/'>About</Link>}}>Loan Planner</Heading>
            </Link>
            <Button onClick={() => setIsShown(true)}>Login</Button>
            <Login isShown={isShown} setIsShown={setIsShown} />
        </nav>
    )
}