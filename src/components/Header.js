import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {

    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1>
                    <Link  
                        to={"/"} 
                        className="text-ligth"
                    >CRUD - react, redux, rest api y axios</Link>
                </h1>
            </div>
            <Link
                to={"/productos/nuevo"}
                className="btn btn-danger d-block d-md-inline-block"
            >Agregar producto &#43;</Link>
        </nav>
    )
}
export default Header;