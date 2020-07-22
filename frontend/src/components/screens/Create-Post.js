import React, { Component } from 'react';
import './Create-Post.css';

class CreatePost extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="card input-field alignment-style">
                    <input type="text" placeholder="Title" />
                    <input type="text" placeholder="Body" />
                    <div className="file-field input-field">
                        <div className="btn #4a148c purple darken-4">
                            <span>Upload Image</span>
                            <input type="file" />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light #4a148c purple darken-4">Submit</button>
                </div>
            </>
        )
    }
}
export default CreatePost;