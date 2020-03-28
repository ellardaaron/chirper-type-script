import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC<NavBarProps> = () => {
    return (
        <div>
            <nav className="nav p-2 shadow justify-content-end align-items-center">
                <NavLink className="py2 mx-2 text-dark" activeClassName="py2 mx-2 text-dark border-bottom border-dark" exact to = "/">Chirps</NavLink>
                <NavLink className="py2 mx-2 text-dark" activeClassName="py2 mx-2 text-dark border-bottom border-dark" exact to = "/compose">Compose</NavLink>
            </nav>
        </div>
    )
}

interface NavBarProps {}

export default Navbar;