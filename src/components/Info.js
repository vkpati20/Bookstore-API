import React from 'react';
import '../stylesheets/Info.css'


export default class Info extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="container info">
            <h3>{this.props.location.about.title}</h3>
            <img src={this.props.location.about.imgURL}/>
            <p>{this.props.location.about.description}</p>
            </div>
        );
    }

}
