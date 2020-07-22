import React, { Component } from 'react';
import './Register.css';
import {Link} from 'react-router-dom';

class Register extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div className="my-card-register">
            <div className="card register-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name"></input> 
                <input type="text" placeholder="Email"></input> 
                <input type="password" placeholder="Password"></input>
                <button className="btn waves-effect waves-light #4a148c purple darken-4">Register</button>
                <h5><Link to="/login">Already Have account? Login</Link></h5>

            </div>
        </div>
        )
    }
}

export default Register;