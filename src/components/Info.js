import React from 'react';
import '../stylesheets/Info.css'


export default class Info extends React.Component {
    constructor(props){
        super(props)
    }

    func = () =>{
        var authors = this.props.location.about.authors;
        if(authors===undefined)
            return "";
        var text ="";
        for(var i = 0; i < authors.length-1; i++)
        {
            text=text+authors[i]+", ";
        }
        text=text+ authors[authors.length-1];
        return text;
    }
    render(){
        return(
            <div className="container info">
            <div className="title">
                <h3>{this.props.location.about.title}</h3>
            </div>
            <div className="img-details">
                <div class="image">
                    <img src={this.props.location.about.imgURL} alt={this.props.location.about.title}/>
                </div>
                <div className="details">
                    <p>Author(s): {this.func()}</p>
                    <p>Publisher: {this.props.location.about.publisher}</p>
                    <p>ISBN: {this.props.location.about.isbn}</p>
                    <a class="btn btn-danger btn-sm" href={this.props.location.about.bookLink} target="_blank">Book Link</a>
                </div>
            </div>
            <div className="desc">
                <p>{this.props.location.about.description}</p>
            </div>
            </div>
        );
    }

}
