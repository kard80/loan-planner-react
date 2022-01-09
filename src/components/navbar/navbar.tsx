import './navbar.less';
import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <nav className={"navbar-container"}>
            <Link to='/'>
                <h1 className="navbar-header" onClick={() => {<Link to="/">About</Link>}}>Loan Planner</h1>
            </Link>
        </nav>
    )
}