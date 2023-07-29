import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import Nav from './Nav'
import './constants/env';
const baseUrl=global.config.data.path.basePath
const fileUrl=global.config.data.path.filePath
export default class About extends Component {
    state={
        user:[],
        educations:[],
        experiences:[],
        skills:[],
        socials:[]
    }
    componentDidMount=()=>{
        document.title = 'About';
        this.about()
    }
    about=()=>{
        const url = baseUrl+'/about'
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
                    user:response.data.data.user_data[0].fields,
                    educations:response.data.data.education_data,
                    experiences:response.data.data.experience_data,
                    skills:response.data.data.skill_data,
                    socials:response.data.data.social_data
                })
            }
        }).catch((err) => {
            console.log(err)
         });
    }
    toggleClass = (e) => {
        if (e.target.classList.contains('tab-item') && !e.target.classList.contains('active')) {
            const aboutSection = document.querySelector(".about-section")
            aboutSection.querySelector(".tab-item.active").classList.remove("active")
            e.target.classList.add('active')
            const target = e.target.getAttribute('data-target')
            aboutSection.querySelector(".tab-content.active").classList.remove("active")
            aboutSection.querySelector(target).classList.add('active')
        }
    };
    downloadCv=(e)=>{
        const url = fileUrl+'image/'+this.state.user.resume
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.pdf')
        document.body.appendChild(link)
        link.target = '_blank';
        link.click()
        document.body.removeChild(link);
    }
    render() {
        const 
        {   
            email,
            phone,
            image,
            resume,
            about

        }=this.state.user
        return (
            <section>
                <Nav />
                <div className="about-section ptb-30">
                    <div className="container">
                        <div className="row">
                            <div className="about-title">
                                <h2>About Me</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="about-img">
                                <div className="img-box">
                                    <img src={fileUrl+'assets/'+image} alt="emran" />
                                </div>
                            </div>
                            <div className="about-text">
                                <p>{about}</p>
                                <h3>Skills</h3>
                                <div className="skills">
                                    {
                                        this.state.skills.map(skill=>{
                                            return <div className="skill-item btn">{skill.fields.name}</div>
                                        })
                                    }
                                    
                                </div>
                                <div onClick={(e) => this.toggleClass(e)} className="about-tabs">
                                    <button className='tab-item active' data-target="#education">Education</button>
                                    <button className='tab-item' data-target="#experience">Experience</button>
                                    <button className='tab-item' data-target="#contact">Contact</button>
                                </div>
                                <div className='tab-content active' id="education">
                                    <div className="timeline">
                                        {
                                            this.state.educations.map(education=>{
                                              return <div className="timeline-item">
                                                        <span className="date">{education.fields.session}</span>
                                                        <h4>{education.fields.degree}</h4>
                                                        <p>{education.fields.institution}</p>
                                                    </div>
                                            })
                                        }
                                        
                                    </div>
                                </div>
                                <div className='tab-content' id="experience">
                                    <div className="timeline">
                                    {
                                        this.state.experiences.map(experience=>{
                                            return <div className="timeline-item">
                                                        <span className="date">{experience.fields.session}</span>
                                                        <h4>{experience.fields.titlle}</h4>
                                                        <p>{experience.fields.company}</p>
                                                    </div>
                                        })
                                    }
                                    </div>
                                </div>
                                <div className='tab-content' id="contact">
                                    <div className="timeline">
                                        <div className="timeline-item">
                                            <span className="email">Email</span>
                                            <p>{email}</p>
                                        </div>
                                        <div className="timeline-item">
                                            <span className="phone">Phone</span>
                                            <p>{phone}</p>
                                        </div>
                                        <div className="timeline-item">
                                            <span className="follow">Get In Touch</span>
                                            <p className="follow-me">
                                                {
                                                    this.state.socials.map(social=>{
                                                        return <a className='social' href={social.fields.link} target={'blank'}>
                                                                    <FontAwesomeIcon icon={
                                                                        (social.fields.name=='linkedin'?faLinkedin
                                                                        :social.fields.name=='whatsapp'?faWhatsapp
                                                                        :social.fields.name=='github'?faGithub
                                                                        :social.fields.name=='stackOverflow'?faStackOverflow:'')
                                                                    } />
                                                                </a>
                                                    })
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={(e)=>this.downloadCv(e)} className="btn" >download cv</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
