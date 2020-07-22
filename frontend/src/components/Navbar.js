import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(<>
            <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo left">My Instagram</Link>
              <ul id="nav-mobile" className="right">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </ul>
            </div>
          </nav>
          </>
        )
    }
}

export default Navbar;