import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="my-card-login">
                <div className="card login-card">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <button className="btn waves-effect waves-light #4a148c purple darken-4">Login</button>
                    <h5><Link to="/register">Don't Have account? Register</Link></h5>
                </div>
            </div>
        )
    }
}

export default Login;