import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Nav from './Nav'
export default class NotFound extends Component {
    componentDidMount=()=>{
        document.title = 'Not found';
    }
    render() {
        return (
            <section>
                <Nav />
                <div className="home-section align-items-center">
                    <div className="container">

                    </div>
                </div>
            </section>
        )
    }
}
