import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import M from 'materialize-css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        }
    }

    handleSubmit=()=>{

        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
            M.toast({ html: "Invalid Email", classes: '#d50000 red accent-4' });
            return;
        }

        const requestBody = {
            email: this.state.email,
            password: this.state.password
        }

        let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
        fetch('/login', init)
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('error')) {
                    M.toast({ html: data.error, classes: '#d50000 red accent-4' });
                }
                else {
                    M.toast({ html: data.message, classes: '#1b5e20 green darken-4' });
                    window.location = "/";
                }

            });

    }

    handleChange = (e) => {
        this.setState(Object.assign({ ...this.state }, { [e.target.name]: e.target.value }));
    }

    render() {
        return (
            <div className="my-card-login">
                <div className="card login-card">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="Email" name="email" onChange={this.handleChange}></input>
                    <input type="password" placeholder="Password" name="password" onChange={this.handleChange}></input>
                    <button className="btn waves-effect waves-light #4a148c purple darken-4" onClick={this.handleSubmit}>Login</button>
                    <h5><Link to="/register">Don't Have account? Register</Link></h5>
                </div>
            </div>
        )
    }
}

export default Login;