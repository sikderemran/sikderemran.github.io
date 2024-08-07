import { Link } from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav'
import './constants/env';
import Loading from './Loading'

const baseUrl=global.config.data.path.basePath
const fileUrl=global.config.data.path.filePath
export default class Home extends Component {
    state={
        user:[],
        isLoading:false
    }
    componentDidMount=()=>{
        document.title = 'Home';
        this.home()
    }
    home=()=>{
        this.setState({
            isLoading:true
        })
        const url = baseUrl+'/home'
        axios({
            url: url,
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => { 
            if(response.data.status==200){
                this.setState({
                    user:response.data.data[0].fields
                })
                console.log('Loading...')
                this.setState({
                    isLoading:false
                })
            }else{
                window.location.reload()
            }
        }).catch((err) => {
            window.location.reload()
        })
    }
    render() {
        const 
        {   
            first_name,
            last_name,
            image,
            designation
        }=this.state.user

        const {isLoading}= this.state

        if (isLoading) {
            return (
                <Loading loading={isLoading} />
            )
        }

        return (
            <section>
                <Nav/>
                <div className="home-section align-items-center">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="home-text">
                                <p>Hello, I'm</p>
                                <h1>{first_name +' '+ last_name}</h1>
                                <h2>{designation}</h2>
                                <Link to="/about" className="btn">More About Me</Link>
                                <Link to="/works" className="btn">Portfolio</Link>
                            </div>
                            <div className="home-img">
                                <div className="img-box">
                                    <img src={fileUrl+'assets/'+image} alt="emran" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}