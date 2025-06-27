import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to='/' className="navbar-brand" href="#">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to='/Homepage' className="nav-link active" aria-current="page" href="#">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/register' className="nav-link" href="#">Register</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/cart' className="nav-link" href="#">Cart(0)</NavLink>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <NavLink to='/' className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </NavLink>

                        </li> */}

                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </div>
        </nav>

    );
}

export default Header;
