import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Nav'
import './constants/env';
const baseUrl=global.config.data.path.basePath
const fileUrl=global.config.data.path.filePath
export default class RecentWork extends Component {
    state={
        works:[]
    }
    toggleClass = (e) => {
        console.log(e.target.closest('.portfolio-popup-item').children[1].classList.toggle("open"))
        document.body.classList.toggle("hide-scrolling")
    }
    componentDidMount=()=>{
        document.title = 'Portfolio';
        this.recentWork()
    }
    recentWork=()=>{
        const url = baseUrl+'/work'
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
                    works:response.data.data.work_data
                })
            }
        }).catch((err) => {
            console.log(err)
         });
    }
    render() {
        return (
            <section>
                <Nav />
                <div className="portfolio-section ptb-30">
                    <div className="container">
                        <div className="row">
                            <div className="section-title">
                                <h2>Recent Works</h2>
                            </div>
                        </div>
                        <div className="row">
                            {
                                this.state.works.map(work=>{
                                    return <div className="portfolio-item">
                                                <div className="portfolio-item-thumbnail">
                                                    <img src={fileUrl+'assets/'+work.fields.image} alt="emran" />
                                                </div>
                                                <h3 className="portfolio-item-title">{work.fields.title}</h3>
                                                <div className='portfolio-popup-item'>
                                                    <button onClick={(e) => this.toggleClass(e)} className="btn view-project-btn">view project</button>
                                                    <div className="portfolio-popup">
                                                        <div className="popup-inner">
                                                            <div className="popup-content">
                                                                <div className="popup-header">
                                                                    <button onClick={(e) => this.toggleClass(e)} className="btn popup-close">x</button>
                                                                    <div className="popup-thumbnail">
                                                                        <img src={fileUrl+'assets/'+work.fields.image} alt="portfolio image" />
                                                                    </div>
                                                                    <h3>{work.fields.title}</h3>
                                                                </div>
                                                                <div className="popup-body">
                                                                    <div className="description">
                                                                        <p>{work.fields.description}</p>
                                                                    </div>
                                                                    <div className="general-info">
                                                                        <ul>
                                                                            <li>Technologies Used <span>{work.fields.tech_used}</span></li>
                                                                            <li><span><a href={work.fields.link} target="blank">View Live</a></span></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}
